import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorAlertComponent } from './sensor-alert.component';

describe('SensorAlertComponent', () => {
  let component: SensorAlertComponent;
  let fixture: ComponentFixture<SensorAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensorAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SensorAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
