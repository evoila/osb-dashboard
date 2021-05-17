import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { TaskPollingService } from "../task-polling.service";
import { NgbDropdownConfig } from "@ng-bootstrap/ng-bootstrap";
import { PollingTask, PollingStatus } from "../domain/polling-task";
import { ViewInformationService } from "../sidebar";

@Component({
  selector: "sb-task-polling",
  templateUrl: "./task-polling.component.html",
  styleUrls: ["./task-polling.component.scss"],
})
export class TaskPollingComponent implements OnInit {
  tasksExist: boolean = false;
  tasksRunning: boolean = false;
  taskErrorHint: boolean = false;
  taskList: { [key: string]: PollingTask } = {};
  dropdownPlacement$: Observable<string>;

  constructor(
    private readonly taskPollingService: TaskPollingService,
    config: NgbDropdownConfig,
    private vis: ViewInformationService
  ) {
    /* gets an event whenebver the nav changes, transforms from boolean to value
    that is needed by the Dropdown menu to place correctly. Variable is then
    used in template with async pipe */
    this.dropdownPlacement$ = vis
      .getIsMainNavInSmartphoneView()
      .pipe(
        map((isSmartphone) => (isSmartphone ? "bottom-left" : "bottom-right"))
      );
  }

  ngOnInit() {
    this.taskPollingService.taskListChange.subscribe((newTaskList) => {
      this.taskList = newTaskList;
      this.checkIfTasksExistAndRunning(this.taskList);
    });
    // indicating a task critical state the user should recognize
    this.taskPollingService.taskListHint.subscribe((flag) => {
      this.taskErrorHint = true;
      
    });
  }

  tasklistTapped(){
    this.taskErrorHint = false;
  }


  checkIfTasksExistAndRunning(taskList: { [key: string]: PollingTask }): void {
    this.tasksRunning = false;
    this.tasksExist = false;
    if (taskList) {
      let keys = Object.keys(taskList);

      if (keys && keys.length > 0) this.tasksExist = true;

      keys.forEach((key) => {
        if (taskList[key].status == PollingStatus.RUNNING) {
          this.tasksRunning = true;
          return;
        }
      });
    }
  }
}