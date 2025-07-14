import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFinalComponent } from './modal-final.component';

describe('ModalFinalComponent', () => {
  let component: ModalFinalComponent;
  let fixture: ComponentFixture<ModalFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalFinalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
