import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZookeeperSettingsComponent } from './zookeeper-settings.component';

describe('ZookeeperSettingsComponent', () => {
  let component: ZookeeperSettingsComponent;
  let fixture: ComponentFixture<ZookeeperSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZookeeperSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZookeeperSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
