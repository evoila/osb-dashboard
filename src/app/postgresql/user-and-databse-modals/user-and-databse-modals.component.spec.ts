import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAndDatabseModalsComponent } from './user-and-databse-modals.component';

describe('UserAndDatabseModalsComponent', () => {
  let component: UserAndDatabseModalsComponent;
  let fixture: ComponentFixture<UserAndDatabseModalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAndDatabseModalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAndDatabseModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
