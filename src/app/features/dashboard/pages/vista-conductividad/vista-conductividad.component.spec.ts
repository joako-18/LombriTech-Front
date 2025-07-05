import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaConductividadComponent } from './vista-conductividad.component';

describe('VistaConductividadComponent', () => {
  let component: VistaConductividadComponent;
  let fixture: ComponentFixture<VistaConductividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaConductividadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaConductividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
