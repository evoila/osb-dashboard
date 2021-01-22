import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
class PostgresqlUsersAndDatabasesService {
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
        this.databases[index] = { name: db.nameOld, users: db.usersOld };
      }
      this.modalSubscription.unsubscribe();
    });
    this.modalSubject.next(modalSetting);
  }
}
