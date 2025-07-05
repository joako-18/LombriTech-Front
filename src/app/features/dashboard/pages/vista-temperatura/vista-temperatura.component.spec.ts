import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaTemperaturaComponent } from './vista-temperatura.component';

describe('VistaTemperaturaComponent', () => {
  let component: VistaTemperaturaComponent;
  let fixture: ComponentFixture<VistaTemperaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaTemperaturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaTemperaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
