import { Component } from '@angular/core';
import { NavigateComponent } from '../../components/navigate/navigate.component';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-configuracion',
  imports: [NavigateComponent, FormsModule, CommonModule], // Asegúrate de añadir FormsModule aquí
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css'
})
export class ConfiguracionComponent {

  nombre: string = 'Joaquin Esau Perez Diaz';
  correo: string = '233412@ids.upchiapas.edu.mx';
  numeroTelegram: string = '961-249-9197';
  rol: string = 'Investigador';
  direccionCorreo: string = '233412@ids.upchiapas.edu.mx';

  // Variables para controlar la visibilidad del modal
  showTelegramModal: boolean = false;
  showEmailModal: boolean = false;

  // Variables para el contenido editable en el modal
  editNumeroTelegram: string = '';
  editDireccionCorreo: string = '';

  openEditModal(type: 'telegram' | 'email') {
    if (type === 'telegram') {
      this.editNumeroTelegram = this.numeroTelegram; // Carga el valor actual
      this.showTelegramModal = true;
    } else if (type === 'email') {
      this.editDireccionCorreo = this.direccionCorreo; // Carga el valor actual
      this.showEmailModal = true;
    }
  }

  closeEditModal() {
    this.showTelegramModal = false;
    this.showEmailModal = false;
  }

  saveTelegram() {
    // Aquí puedes añadir validación si es necesario
    this.numeroTelegram = this.editNumeroTelegram;
    this.closeEditModal();
    // En una aplicación real, aquí enviarías el dato al backend
    alert('Número de Telegram actualizado a: ' + this.numeroTelegram);
  }

  saveEmail() {
    // Aquí puedes añadir validación si es necesario
    this.direccionCorreo = this.editDireccionCorreo;
    this.closeEditModal();
    // En una aplicación real, aquí enviarías el dato al backend
    alert('Dirección de Correo actualizada a: ' + this.direccionCorreo);
  }
}