import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueEsVermicompostaComponent } from './que-es-vermicomposta.component';

describe('QueEsVermicompostaComponent', () => {
  let component: QueEsVermicompostaComponent;
  let fixture: ComponentFixture<QueEsVermicompostaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueEsVermicompostaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueEsVermicompostaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
