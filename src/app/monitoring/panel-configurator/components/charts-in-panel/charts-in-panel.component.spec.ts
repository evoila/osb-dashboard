import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsInPanelComponent } from './charts-in-panel.component';

describe('ChartsInPanelComponent', () => {
  let component: ChartsInPanelComponent;
  let fixture: ComponentFixture<ChartsInPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartsInPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsInPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
