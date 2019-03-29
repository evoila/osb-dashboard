import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KafkaSettingsComponent } from './kafka-settings.component';

describe('KafkaSettingsComponent', () => {
  let component: KafkaSettingsComponent;
  let fixture: ComponentFixture<KafkaSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KafkaSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KafkaSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
