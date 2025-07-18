import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorProbabilityChartComponent } from './sensor-probability-chart.component';

describe('SensorProbabilityChartComponent', () => {
  let component: SensorProbabilityChartComponent;
  let fixture: ComponentFixture<SensorProbabilityChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensorProbabilityChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SensorProbabilityChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
