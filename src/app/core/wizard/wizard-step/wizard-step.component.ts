import {
  EventEmitter,
  Component,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'sb-wizard-step',
  templateUrl: './wizard-step.component.html',
  styleUrls: ['./wizard-step.component.scss'],
})
export class WizardStepComponent {
  public isCompleted: boolean = false;

  @Input() title: string;
  @Input() id: string;
  @Input() active: boolean = false;
  @Input() isSkipped: boolean = false;
  @Input() stepId: string;
  @Output() onClicked = new EventEmitter<WizardStepComponent>();

  constructor() { }

  public onClick(): void {
    if (this.isCompleted || this.active) {
      this.onClicked.emit(this);
    }
  }
}
