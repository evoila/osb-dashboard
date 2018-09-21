import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsQueryEditorComponent } from './es-query-editor.component';

describe('EsQueryEditorComponent', () => {
  let component: EsQueryEditorComponent;
  let fixture: ComponentFixture<EsQueryEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsQueryEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsQueryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
