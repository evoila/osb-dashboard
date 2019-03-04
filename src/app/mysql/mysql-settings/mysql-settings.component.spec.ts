import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MysqlSettingsComponent } from './mysql-settings.component';

describe('MysqlSettingsComponent', () => {
  let component: MysqlSettingsComponent;
  let fixture: ComponentFixture<MysqlSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MysqlSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MysqlSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
