import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaTurbidezComponent } from './vista-turbidez.component';

describe('VistaTurbidezComponent', () => {
  let component: VistaTurbidezComponent;
  let fixture: ComponentFixture<VistaTurbidezComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaTurbidezComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaTurbidezComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
