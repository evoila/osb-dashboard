import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PgpoolSettingsComponent } from './pgpool-settings.component';

describe('PgpoolSettingsComponent', () => {
  let component: PgpoolSettingsComponent;
  let fixture: ComponentFixture<PgpoolSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PgpoolSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PgpoolSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
