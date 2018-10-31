import {
  AfterContentInit,
  Component,
  ContentChildren,
  forwardRef,
  Input,
  Output,
  EventEmitter,
  QueryList
} from '@angular/core';

import { WizardStepComponent } from '../wizard-step/wizard-step.component';
import { WizardPageComponent } from '../wizard-page/wizard-page.component';
import { Subscription } from 'rxjs';

let mstWizardComponent = 0;

@Component({
  selector: 'sb-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements AfterContentInit {
  public id: string;
  public isLast: boolean = false;
  public isFirst: boolean = true;
  public isFooterVisible: boolean = true;

  private _currentStepIndex: number = -1;
  private _currentStep: WizardStepComponent;
  private _currentPage: WizardPageComponent;

  @Input() size: string;
  @Input() navPosition: string;
  @Input() title: string;

  @Input() wizardFinishedOp: Subscription;

  @ContentChildren(forwardRef(() => WizardStepComponent)) stepChildren: QueryList<WizardStepComponent>;
  @ContentChildren(forwardRef(() => WizardPageComponent)) pageChildren: QueryList<WizardPageComponent>;

  @Output() readonly pageChange = new EventEmitter<WizardPageChangeEvent>();

  @Output() readonly currentStepIndexChanged: EventEmitter<number> = new EventEmitter<number>(false);
  @Output() readonly currentStepChanged: EventEmitter<WizardStepComponent> = new EventEmitter<WizardStepComponent>(false);
  @Output() readonly currentPageChanged: EventEmitter<WizardPageComponent> = new EventEmitter<WizardPageComponent>(false);
  @Output() readonly wizardFinished: EventEmitter<WizardComponent> = new EventEmitter<WizardComponent>(false);

  constructor() {
    this.id = 'sb-wizard-' + (mstWizardComponent++);
  }

  get navClass(): string {
    if (this.navPosition === 'right') {
      return 'wizard-nav-right';
    }

    return 'wizard-nav-left';
  }

  get steps(): WizardStepComponent[] {
    return this.stepChildren.toArray();
  }

  get pages(): WizardPageComponent[] {
    return this.pageChildren.toArray();
  }

  set currentStep(currentStep: WizardStepComponent) {
    this._currentStep = currentStep;
    this.currentStepChanged.emit(currentStep);
  }

  get currentStep(): WizardStepComponent {
    return this._currentStep;
  }

  set currentPage(page: WizardPageComponent) {
    this._currentPage = page;
    this.currentPageChanged.emit(page);
  }

  get currentPage(): WizardPageComponent {
    return this._currentPage;
  }

  set currentStepIndex(index: number) {
    this._currentStepIndex = index;
    this.currentStepIndexChanged.emit(index);
  }

  get currentStepIndex(): number {
    return this._currentStepIndex;
  }

  get nextText(): string {
    return this.isLast ? this.title : 'Next';
  }

  setupStepsAndPages(): void {
    this.steps.forEach((step: WizardStepComponent, index: number) => {
      if (!step.id) {
        step.id = this.id + '-step-' + index;
      }
      if (step.active) {
        this.currentStep = step;
        this._currentStepIndex = index;
      }

      step.onClicked.subscribe(() => {
        this.selectStep(step);
      });
    });

    this.pages.forEach((page: WizardPageComponent, index: number) => {
      if (!page.id) {
        page.id = this.id + '-page-' + index;
      }
      if (page.active) {
        this.currentPage = page;
      }
    });

    if (!this.currentStep && this.steps.length > 0) {
      this.selectStep(this.steps[0]);
    }
  }

  selectStep(step: WizardStepComponent): void {
    this.steps.forEach((aStep: WizardStepComponent) => aStep.active = false);
    this.pages.forEach((page: WizardPageComponent) => page.active = false);

    const index: number = this.steps.indexOf(step);
    step.active = true;
    this.currentStep = step;
    this.currentStepIndex = index;

    let selectedPage: WizardPageComponent | null = null;
    if (index < this.pages.length) {
      selectedPage = this.pages[index];
      this.currentPage = selectedPage;
      selectedPage.active = true;
    }

    this.currentPage.onActivate.emit(false);

    const totalSteps: number = this.steps.length - 1;
    this.isLast = this.currentStepIndex === totalSteps;
    this.isFirst = this.currentStepIndex === 0;
  }

  submit(): void {
    this.currentPage.submit();
  }

  next(): void {
    const totalSteps: number = this.steps.length - 1;
    const i: number = this.currentStepIndex;
    const page: WizardPageComponent = this.pages[i];

    if (page.nextDisabled) {
      return;
    }
    page.onCommit.emit(null);

    if (totalSteps === i) {
      this.wizardFinished.emit(this);
      return;
    }

    if (i < totalSteps) {
      const currentStep: WizardStepComponent = this.steps[i];
      currentStep.isCompleted = true;

      const nextStep: WizardStepComponent = this.steps[i + 1];
      this.selectStep(nextStep);
    }
  }

  prev(): void {
    const i: number = this.currentStepIndex;

    if (i > 0) {
      const wizardStep: WizardStepComponent = this.steps[i];
      const prevStep: WizardStepComponent = this.steps[i - 1];
      wizardStep.isCompleted = false;
      prevStep.isCompleted = false;
      this.selectStep(prevStep);
    }
  }

  ngAfterContentInit(): void {
    this.setupStepsAndPages();

    this.stepChildren.changes.subscribe(children => {
      this.setupStepsAndPages();
    });
    this.pageChildren.changes.subscribe(children => {
      this.setupStepsAndPages();
    });
  }
}

export interface WizardPageChangeEvent {
  activeId: string;
  nextId: string;
  preventDefault: () => void;
}
