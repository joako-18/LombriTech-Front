import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaErrorComponent } from './vista-error.component';

describe('VistaErrorComponent', () => {
  let component: VistaErrorComponent;
  let fixture: ComponentFixture<VistaErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
