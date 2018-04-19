import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecifyQueryComponent } from './specify-query.component';

describe('SpecifyQueryComponent', () => {
  let component: SpecifyQueryComponent;
  let fixture: ComponentFixture<SpecifyQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecifyQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecifyQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
