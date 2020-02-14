import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuerySelectComponent } from './query-select.component';

describe('QuerySelectComponent', () => {
  let component: QuerySelectComponent;
  let fixture: ComponentFixture<QuerySelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuerySelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuerySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
