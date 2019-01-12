import { Component, OnInit } from '@angular/core';
import { TaskPollingService } from '../task-polling.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { PollingTask, PollingStatus } from '../domain/polling-task';

@Component({
  selector: 'sb-task-polling',
  templateUrl: './task-polling.component.html',
  styleUrls: ['./task-polling.component.scss']
})
export class TaskPollingComponent implements OnInit {
  tasksExist: boolean = false;
  tasksRunning: boolean = false;
  taskList: { [key: string]: PollingTask; } = {};

  constructor(private readonly taskPollingService: TaskPollingService,
    config: NgbDropdownConfig) {
    config.placement = 'bottom-right';
  }

  ngOnInit() {
    this.taskPollingService.taskListChange.subscribe(newTaskList => {
      this.taskList = newTaskList;
      this.checkIfTasksExistAndRunning(this.taskList);
    });
  }

  checkIfTasksExistAndRunning(taskList: { [key: string]: PollingTask; }): void {
    this.tasksRunning = false;
    this.tasksExist = false;
    if (taskList) {
      let keys = Object.keys(taskList);

      if (keys && keys.length > 0)
        this.tasksExist = true;

      keys.forEach(key => {
        if (taskList[key].status == PollingStatus.RUNNING) {
          this.tasksRunning = true;
          return;
        }
      });
    }

  }

}
