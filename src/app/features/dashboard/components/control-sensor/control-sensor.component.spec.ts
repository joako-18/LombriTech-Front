import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlSensorComponent } from './control-sensor.component';

describe('ControlSensorComponent', () => {
  let component: ControlSensorComponent;
  let fixture: ComponentFixture<ControlSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlSensorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
