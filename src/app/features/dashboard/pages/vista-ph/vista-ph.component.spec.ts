import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPhComponent } from './vista-ph.component';

describe('VistaPhComponent', () => {
  let component: VistaPhComponent;
  let fixture: ComponentFixture<VistaPhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaPhComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaPhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
