import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CassandraComponent } from './cassandra.component';

describe('CassandraComponent', () => {
  let component: CassandraComponent;
  let fixture: ComponentFixture<CassandraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CassandraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CassandraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
