import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CassandraSettingsComponent } from './cassandra-settings.component';

describe('CassandraSettingsComponent', () => {
  let component: CassandraSettingsComponent;
  let fixture: ComponentFixture<CassandraSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CassandraSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CassandraSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
