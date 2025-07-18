import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSeriesGraphsComponent } from './time-series-graphs.component';

describe('TimeSeriesGraphsComponent', () => {
  let component: TimeSeriesGraphsComponent;
  let fixture: ComponentFixture<TimeSeriesGraphsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeSeriesGraphsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeSeriesGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
