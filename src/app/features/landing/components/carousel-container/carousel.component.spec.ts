import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselContainerComponent } from './carousel-container.component';

describe('CarouselContainerComponent', () => {
  let component: CarouselContainerComponent;
  let fixture: ComponentFixture<CarouselContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
