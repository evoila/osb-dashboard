import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostgresqlUsersAndDatabasesComponent } from './postgresql-users-and-databases.component';

describe('PostgresqlUsersAndDatabasesComponent', () => {
  let component: PostgresqlUsersAndDatabasesComponent;
  let fixture: ComponentFixture<PostgresqlUsersAndDatabasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostgresqlUsersAndDatabasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostgresqlUsersAndDatabasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
