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
  readonly formLayout = [
    {
      key: "databases",
      type: "array",
      items: [
        {
          type: "div",
          displayFlex: true,
          items: [
            {
              key: "databases[].name",
            },
            {
              key: "databases[].users",
              items: [
                {
                  type: "string",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: "users",
      type: "array",
      items: [
        {
          type: "div",
          displayFlex: true,
          "flex-direction": "row",
          items: [
            {
              key: "users[].admin",
              flex: "1 1 50px",
            },
            {
              key: "users[].username",
              flex: "4 4 200px",
              notitle: true,
              placeholder: "Username",
            },
            {
              key: "users[].password",
              flex: "4 4 200px",
              notitle: true,
              placeholder: "Password",
            },
          ],
        },
      ],
    },
  ];

  public databases: Array<any>;
  public users: Array<any>;
  // holds the information how users and databases have changed
  public prior_databases: Array<any>;
  public prior_users: Array<any>;
  public modalSubject: Subject<ModalSettings> = new Subject<ModalSettings>();
  private modalSubscription: Subscription;

  constructor(private generalService: GeneralService) {}

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
  addUser() {
    this.users.push({ password: "", username: "", admin: false, inEdit: true });
  }
  deleteDatabase(index: number) {
    // Todo add Modal later on
    const modalSetting = {
      open: true,
      description: "Delete Database",
      modalBody: "Are you sure you want to delete this database?",
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
    this.modalSubscription = modalSetting.resultSubject.subscribe((k) => {
      if (k === "delete") {
        this.databases.splice(index, 1);
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
  }
}
