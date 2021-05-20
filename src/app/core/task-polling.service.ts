import { Injectable } from '@angular/core';
import { Observable, interval, Subject } from 'rxjs';
import { exhaustMap, map, filter, take, timeout } from 'rxjs/operators';
import { PollingTask, PollingStatus } from './domain/polling-task';

import { environment } from 'environments/runtime-environment';
import { HttpClient } from '@angular/common/http';

const endpoint = environment.baseUrls.serviceBrokerUrl;
@Injectable()
export class TaskPollingService {
  readonly BASEURL = endpoint + '/custom/v2/manage/service_instances';
  private readonly TIMEOUT = 600000;
  private readonly SUCCESS_STATE = "succeeded";
  private readonly FAILURE_STATE = "failed"
  private readonly INTERVAL = 2000;
  taskList: { [key:string]:PollingTask; } = {};
  taskListChange: Subject<{ [key:string]:PollingTask; }> = new Subject<{ [key:string]:PollingTask; }>();
  taskListHint: Subject< boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  public lastOperation(): Observable<{} | any> {
    return this.http.get(this.BASEURL + '/' + environment.serviceInstanceId + '/last_operation');
  }

  pollState(name: string, stateField: string, descriptionField: string, successState?: string,
    failureState?: string, timeoutPeriod?: number): void {

    if (!successState)
      successState = this.SUCCESS_STATE;

    if (!failureState)
      failureState = this.FAILURE_STATE;

    if (!timeoutPeriod)
      timeoutPeriod = this.TIMEOUT;

    let id = this.randomId();
    this.addPollingOperation(id, PollingStatus.RUNNING, name, "Operation started");
    interval(this.INTERVAL).pipe(
      exhaustMap((val: number, index: number) => {
        return this.lastOperation().pipe(
          map(k => k)
        );
      }),
      filter((result: string) => {
        let isTerminated = false;
        let currentPollingState = PollingStatus.RUNNING;

        if (result[stateField] == successState) {
          currentPollingState = PollingStatus.SUCCEEDED;
          isTerminated = true;
        } else if (result[stateField] == failureState) {
          currentPollingState = PollingStatus.FAILED;
          isTerminated = true;
        }

        this.updatePollingOperation(id, currentPollingState, result[descriptionField]);

        return isTerminated;
      }),
      take(1),
      timeout(timeoutPeriod)
    ).subscribe(
      result => {
        
        this.updatePollingOperation(id, result[stateField], "Task Result: ".concat(result[descriptionField]));
      },
      error => {
        this.updatePollingOperation(id, PollingStatus.FAILED, error);
      }
    );
  }

  addPollingOperation(id: string, status: PollingStatus, name: string, operation: string): void {
    this.taskList[id] = {
      id: id,
      name: name,
      operation: operation,
      status: status,
      startDate: new Date(),
      endDate: new Date()
    };
    this.updateTaskListSource();
  }

  updatePollingOperation(id: string, status: PollingStatus, operation: string): void {
    if(status.toLowerCase() == "failed"){
      this.taskListHint.next(true);
    }
    this.taskList[id].operation = operation;
    this.taskList[id].status = status;
    this.taskList[id].endDate = new Date();
    this.updateTaskListSource();
  }

  updateTaskListSource(): void {
    this.taskListChange.next(this.taskList);
  }

  randomId(): string {
    return new Date().getTime().toString();
  }
}
