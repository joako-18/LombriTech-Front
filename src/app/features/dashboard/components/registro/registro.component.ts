import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Output,EventEmitter } from '@angular/core';
import { UserAlertComponent } from '../../../../shared/components/user-alert/user-alert.component';
import { UserAlertProblemComponent } from '../../../../shared/components/user-alert-problem/user-alert-problem.component';
@Component({
  selector: 'app-registro',
  imports: [CommonModule, ReactiveFormsModule, UserAlertComponent, UserAlertProblemComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  registroForm: FormGroup;
  currentStep: number = 1;
  showSuccessAlert: boolean = false;
  showProblemAlert: boolean = false;
  isSubmitting: boolean = false;


  @Output() cerrar = new EventEmitter<void>();



cerrarModal() {
  this.cerrar.emit();
}
  constructor(private fb: FormBuilder, private router: Router) {
    this.registroForm = this.fb.group({
      // Paso 1: Información Personal
      tipoUsuario: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellidoPaterno: ['', [Validators.required]],
      apellidoMaterno: ['', [Validators.required]],
      
      // Paso 2: Cuenta
      email: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContraseña: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator.bind(this) });
  }

  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('contraseña');
    const confirmPassword = form.get('confirmarContraseña');
    
    if (!password || !confirmPassword) {
      return null;
    }
    
    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  isStep1Valid(): boolean {
    const tipoUsuario = this.registroForm.get('tipoUsuario');
    const nombre = this.registroForm.get('nombre');
    const apellidoPaterno = this.registroForm.get('apellidoPaterno');
    const apellidoMaterno = this.registroForm.get('apellidoMaterno');
    
    return !!(tipoUsuario?.valid && nombre?.valid && apellidoPaterno?.valid && apellidoMaterno?.valid);
  }

  nextStep() {
    if (this.isStep1Valid() && this.currentStep === 1) {
      this.currentStep = 2;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep = 1;
    }
  }

  async onSubmit() {
    if (this.registroForm.valid && this.currentStep === 2) {
      this.isSubmitting = true;
      
      try {
        const formData = this.registroForm.value;
        console.log('Datos del registro:', formData);
        
       
        await this.simulateRegistrationAPI(formData);
        
        this.showSuccessAlert = true;
        
      } catch (error) {
        console.error('Error en el registro:', error);
        this.showProblemAlert = true;
      } finally {
        this.isSubmitting = false;
      }
    } else {
      // Marcar campos como tocados para mostrar errores
      Object.keys(this.registroForm.controls).forEach(key => {
        this.registroForm.get(key)?.markAsTouched();
      });
    }
  }
   onAlertAccept() {
    console.log('Usuario registrado exitosamente');
    // Resetear formulario
    this.registroForm.reset();
    this.currentStep = 1;
    // Cerrar alerta
    this.showSuccessAlert = false;
    // Redirigir al login
    this.router.navigate(['/auth/login']); 
  }

  onAlertClose() {
    this.showSuccessAlert = false;
  }

  onProblemAlertAccept() {
    console.log('Error en el registro');
    this.showProblemAlert = false;
  }

  // Simular API de registro
  private simulateRegistrationAPI(formData: any): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.9) {
          resolve();
        } else {
          reject(new Error('Error de servidor'));
        }
      }, 2000);
    });
  }

  // Manejar la respuesta de la alerta de éxito
  onSuccessAlertAccept() {
    console.log('Usuario registrado exitosamente');
    this.registroForm.reset();
    this.currentStep = 1;
    this.router.navigate(['/login']);
  }

  onSuccessAlertClose() {
    this.showSuccessAlert = false;
  }

  irALogin(event: Event) {
    event.preventDefault();
    this.router.navigate(['/login']);
    console.log('Navegar a login');
  }

  volver() {
    this.router.navigate(['/home']);
    console.log('Volver al inicio');
  }



  get nombreCompleto(): string {
    const nombre = this.registroForm.get('nombre')?.value || '';
    const apellidoPaterno = this.registroForm.get('apellidoPaterno')?.value || '';
    const apellidoMaterno = this.registroForm.get('apellidoMaterno')?.value || '';
    return `${nombre} ${apellidoPaterno} ${apellidoMaterno}`.trim();
  }
}