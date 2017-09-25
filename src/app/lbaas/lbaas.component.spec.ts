import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LBaasComponent } from './lbaas.component';

describe('LbaasComponent', () => {
  let component: LBaasComponent;
  let fixture: ComponentFixture<LBaasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LBaasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LBaasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
