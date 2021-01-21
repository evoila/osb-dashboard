import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable, Subscription, Subject } from "rxjs";
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
export interface ModalButton {
  text: string;
  isDismiss: boolean;
  result: string;
  classes: Array<string>;
}
export interface ModalSettings {
  open: boolean;
  description: string;
  modalBody: string;
  buttons: Array<ModalButton>;
  resultSubject: Subject<string>;
}


@Component({
  selector: "sb-user-and-databse-modals",
  templateUrl: "./user-and-databse-modals.component.html",
  styleUrls: ["./user-and-databse-modals.component.scss"],
})
export class UserAndDatabseModalsComponent implements OnInit, OnDestroy {
  @Input() open$: Observable<ModalSettings>;
  subscription: Subscription;
  modalSettings: ModalSettings;


  constructor(private modalService: NgbModal) {}

  @ViewChild("content", { static: true }) content: ElementRef;

  ngOnInit(): void {
    this.subscription = this.open$.subscribe((modalSettings) => {
      this.modalSettings = modalSettings;
      this.modalService
        .open(this.content, { ariaLabelledBy: "modal-basic-title" })
        .result.then(
          (result) => {
            modalSettings.resultSubject.next(result);
          },
          (reason) => {
            modalSettings.resultSubject.next(reason);
          }
        );
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  public closeOrDismiss(isDismiss: boolean, modal: any, result: string) {
    if (isDismiss) {
      modal.dismiss(result);
    } else {
      modal.close(result);
    }
  }
}
