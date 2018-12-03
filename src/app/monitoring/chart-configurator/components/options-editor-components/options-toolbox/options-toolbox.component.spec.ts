import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsToolboxComponent } from './options-toolbox.component';

describe('OptionsToolboxComponent', () => {
  let component: OptionsToolboxComponent;
  let fixture: ComponentFixture<OptionsToolboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionsToolboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsToolboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
