import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleViewEditorComponent } from './single-view-editor.component';

describe('SingleViewEditorComponent', () => {
  let component: SingleViewEditorComponent;
  let fixture: ComponentFixture<SingleViewEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleViewEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleViewEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
