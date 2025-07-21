import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistogramaCardComponent } from './histograma-card.component';

describe('HistogramaCardComponent', () => {
  let component: HistogramaCardComponent;
  let fixture: ComponentFixture<HistogramaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistogramaCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistogramaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
