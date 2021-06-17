import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Log4jSettingsComponent } from './log4j-settings.component';

describe('Log4jSettingsComponent', () => {
  let component: Log4jSettingsComponent;
  let fixture: ComponentFixture<Log4jSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Log4jSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Log4jSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
