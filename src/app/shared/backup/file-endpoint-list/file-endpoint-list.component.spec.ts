import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileEndpointListComponent } from './file-endpoint-list.component';

describe('FileEndpointListComponent', () => {
  let component: FileEndpointListComponent;
  let fixture: ComponentFixture<FileEndpointListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileEndpointListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileEndpointListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
