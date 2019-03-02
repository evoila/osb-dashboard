import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MysqlUsersAndDatabasesComponent } from './mysql-users-and-databases.component';

describe('MysqlUsersAndDatabasesComponent', () => {
  let component: MysqlUsersAndDatabasesComponent;
  let fixture: ComponentFixture<MysqlUsersAndDatabasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MysqlUsersAndDatabasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MysqlUsersAndDatabasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
