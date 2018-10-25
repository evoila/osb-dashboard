import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromQueryEditorComponent } from './prom-query-editor.component';

describe('PromQueryEditorComponent', () => {
  let component: PromQueryEditorComponent;
  let fixture: ComponentFixture<PromQueryEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromQueryEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromQueryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
