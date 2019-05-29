import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedisSettingsComponent } from './redis-settings.component';

describe('RedisSettingsComponent', () => {
  let component: RedisSettingsComponent;
  let fixture: ComponentFixture<RedisSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedisSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedisSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
