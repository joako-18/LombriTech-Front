import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaHumedadComponent } from './vista-humedad.component';

describe('VistaHumedadComponent', () => {
  let component: VistaHumedadComponent;
  let fixture: ComponentFixture<VistaHumedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaHumedadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaHumedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
