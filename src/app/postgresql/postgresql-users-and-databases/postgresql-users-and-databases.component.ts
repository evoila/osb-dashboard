import {
  Notification,
  NotificationType,
  NotificationService,
} from "./../../core/notification.service";

import { TaskPollingService } from "app/core/task-polling.service";
import { ModalButton } from "./../user-and-databse-modals/user-and-databse-modals.component";
import { Subject, Subscription } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { GeneralService } from "app/shared/general/general.service";
import { ModalSettings } from "../user-and-databse-modals/user-and-databse-modals.component";

@Component({
  selector: "sb-postgresql-users-and-databases",
  templateUrl: "./postgresql-users-and-databases.component.html",
  styleUrls: ["./postgresql-users-and-databases.component.scss"],
})
export class PostgresqlUsersAndDatabasesComponent implements OnInit {
  readonly formElements: Array<string> = ["databases", "users"];
  readonly instanceGroupName: string = "postgres";

  public databases: Array<any>;
  public users: Array<any>;
  // holds the information how users and databases have changed
  public prior_databases: Array<any>;
  public prior_users: Array<any>;
  public modalSubject: Subject<ModalSettings> = new Subject<ModalSettings>();
  private modalSubscription: Subscription;

  constructor(
    private generalService: GeneralService,
    readonly taskPolling: TaskPollingService,
    readonly notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.generalService.loadServiceInstance().subscribe((res) => {
      const postgres = res.parameters.postgres;
      this.databases = postgres.databases;
      this.users = postgres.users;
    });
  }
  isAdmin(isAdmin: boolean) {
    return isAdmin ? "admin" : "normal User";
  }
  addDatabase() {
    this.databases.push({ name: "", users: [], inEdit: true });
  }
  editDatabase(index: number) {
    const db = this.databases[index];
    this.databases[index] = {
      ...db,
      nameOriginal: db.name,
      usersOriginal: db.users,
      inEdit: true,
    };
  }

  addUser() {
    this.users.push({ password: "", username: "", admin: false, inEdit: true });
  }
  editUser(index: number) {
    const user = this.users[index];
    this.users[index] = {
      ...user,
      passwordOriginal: user.password,
      usernameOriginal: user.username,
      adminOriginal: user.admin,
      inEdit: true,
    };
  }

  manageDBUsers(index) {
    const info =
      "display model/template/component SHOWING ALL CURRENT USERS &  select element offering available users to add or remove for this db";
    alert(info);
    console.log(info);
  }

  deleteDatabase(index: number) {
    const modalSetting = {
      open: true,
      description: "Delete Database",
      modalBody:
        "Are you sure to delete database " + this.databases[index].name + " ?",
      buttons: [
        {
          text: "cancel",
          isDismiss: true,
          result: "cancel",
          classes: ["btn", "btn-primary"],
        } as ModalButton,
        {
          text: "delete",
          isDismiss: false,
          result: "delete",
          classes: ["btn", "btn-danger"],
        } as ModalButton,
      ],
      resultSubject: new Subject<string>(),
    } as ModalSettings;
    if (this.databases[index].inEdit && this.databases[index].nameOriginal) {
      modalSetting.description = "Discard Editing";
      modalSetting.modalBody = "Are you sure you will discard your changes?";
      modalSetting.buttons[0].text = "continue editing";
      modalSetting.buttons[1].text = "discard";
      modalSetting.buttons[1].result = "discard";
    }
    this.modalSubscription = modalSetting.resultSubject.subscribe((k) => {
      if (k === "delete") {
        this.databases.splice(index, 1);
      } else if (k === "discard") {
        const db = this.databases[index];
        this.databases[index] = {
          name: db.nameOriginal,
          users: db.usersOriginal,
        };
      }
      this.modalSubscription.unsubscribe();
    });
    this.modalSubject.next(modalSetting);
  }

  deleteUser(index: number) {
    const modalSetting = {
      open: true,
      description: "Delete User ",
      modalBody:
        "Are you sure to delete user " + this.users[index].username + " ?",
      buttons: [
        {
          text: "cancel",
          isDismiss: true,
          result: "cancel",
          classes: ["btn", "btn-primary"],
        } as ModalButton,
        {
          text: "delete",
          isDismiss: false,
          result: "delete",
          classes: ["btn", "btn-danger"],
        } as ModalButton,
      ],
      resultSubject: new Subject<string>(),
    } as ModalSettings;
    if (this.users[index].inEdit && this.users[index].usernameOriginal) {
      modalSetting.description = "Discard Editing";
      modalSetting.modalBody = "Are you sure you will discard your changes?";
      modalSetting.buttons[0].text = "continue editing";
      modalSetting.buttons[1].text = "discard";
      modalSetting.buttons[1].result = "discard";
    }
    this.modalSubscription = modalSetting.resultSubject.subscribe((k) => {
      if (k === "delete") {
        this.users.splice(index, 1);
      } else if (k == "discard") {
        const u = this.users[index];
        this.users[index] = {
          username: u.usernameOriginal,
          password: u.passwordOriginal,
          admin: u.adminOriginal,
        };
      }
      this.modalSubscription.unsubscribe();
    });
    this.modalSubject.next(modalSetting);
  }

  save() {
    // clean out edit datastructure, since server would reject it
    this.databases = this.databases.map((k) => {
      return { name: k.name, users: k.users };
    });
    this.users = this.users.map((k) => {
      return { username: k.username, password: k.password, admin: k.admin };
    });
    // send it
    console.log(this.databases, this.users);
    const url = "/custom/v2/manage/service_instances/";
    const payload = {
      postgres: {
        users: this.users,
        databases: this.databases,
      },
    };
    this.generalService.saveOneWithTaskPolling(payload);
  }

  cancelAll() {
    // remove edit data garbage ( and reset UI )
    this.databases = this.databases.map((k) => {
      // ternary field wise (more checks)
      return {
        name: k.inEdit ? k.nameOriginal : k.name,
        users: k.inEdit ? k.usersOriginal : k.users,
      };
    });
    this.users = this.users.map((k) => {
      // ternary obj wise (more code)
      return k.inEdit
        ? {
            username: k.usernameOriginal,
            password: k.passworOoriginal,
            admin: k.adminOriginal,
          }
        : {
            username: k.username,
            password: k.password,
            admin: k.admin,
          };
    });
  }
}
