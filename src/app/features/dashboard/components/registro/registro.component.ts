// registro.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserAlertComponent } from '../../../../shared/components/user-alert/user-alert.component';
import { UserAlertProblemComponent } from '../../../../shared/components/user-alert-problem/user-alert-problem.component';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UserAlertComponent, UserAlertProblemComponent],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;
  currentStep: number = 1;
  showSuccessAlert: boolean = false;
  showProblemAlert: boolean = false;
  isSubmitting: boolean = false;

  @Output() cerrar = new EventEmitter<void>();
  @Output() registrado = new EventEmitter<{
    tipoUsuario: string;
    nombre: string;
    apellido: string;
    email: string;
    contraseña: string;
    confirmarContraseña: string;
  }>();

  constructor(private fb: FormBuilder, private router: Router) {
    this.registroForm = this.fb.group({
      tipoUsuario: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContraseña: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator.bind(this) });
  }

  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('contraseña');
    const confirmPassword = form.get('confirmarContraseña');
    if (!password || !confirmPassword) return null;
    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  isStep1Valid(): boolean {
    return !!(
      this.registroForm.get('tipoUsuario')?.valid &&
      this.registroForm.get('nombre')?.valid &&
      this.registroForm.get('apellido')?.valid
    );
  }

  nextStep() {
    if (this.isStep1Valid() && this.currentStep === 1) {
      this.currentStep = 2;
    } else {
      this.markStep1AsTouched();
    }
  }

  private markStep1AsTouched() {
    this.registroForm.get('tipoUsuario')?.markAsTouched();
    this.registroForm.get('nombre')?.markAsTouched();
    this.registroForm.get('apellido')?.markAsTouched();
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep = 1;
    }
  }

  onSubmit() {
    if (this.registroForm.valid && this.currentStep === 2) {
      this.isSubmitting = true;
      
      const formData = this.registroForm.value;
      this.registrado.emit(formData);
      
      this.showSuccessAlert = true;
      this.isSubmitting = false;
    } else {
      this.markAllAsTouched();
    }
  }

  private markAllAsTouched() {
    Object.keys(this.registroForm.controls).forEach(key => {
      this.registroForm.get(key)?.markAsTouched();
    });
  }

  cerrarModal() {
    this.cerrar.emit();
  }

  onAlertAccept() {
    this.showSuccessAlert = false;
    this.registroForm.reset();
    this.currentStep = 1;
    this.cerrarModal();
  }

  onAlertClose() {
    this.showSuccessAlert = false;
  }

  onProblemAlertAccept() {
    this.showProblemAlert = false;
  }
}