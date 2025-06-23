import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComoFuncionaComponent } from './app-como-funciona.component';

describe('AppComoFuncionaComponent', () => {
  let component: AppComoFuncionaComponent;
  let fixture: ComponentFixture<AppComoFuncionaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComoFuncionaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppComoFuncionaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
