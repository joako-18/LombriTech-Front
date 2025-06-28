import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAlertProblemComponent } from './user-alert-problem.component';

describe('UserAlertProblemComponent', () => {
  let component: UserAlertProblemComponent;
  let fixture: ComponentFixture<UserAlertProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAlertProblemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAlertProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
