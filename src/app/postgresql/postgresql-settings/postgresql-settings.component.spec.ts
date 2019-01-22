import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostgresqlSettingsComponent } from './postgresql-settings.component';

describe('PostgresqlSettingsComponent', () => {
  let component: PostgresqlSettingsComponent;
  let fixture: ComponentFixture<PostgresqlSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostgresqlSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostgresqlSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
