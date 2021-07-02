import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsbListComponent } from './osb-list.component';

describe('OsbListComponent', () => {
  let component: OsbListComponent;
  let fixture: ComponentFixture<OsbListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OsbListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OsbListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
