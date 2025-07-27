import { Component, OnInit } from '@angular/core';
import { NavigateComponent } from '../../components/navigate/navigate.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../user/services/user.service';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [NavigateComponent, FormsModule, CommonModule],
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css'] // corregido a styleUrls
})
export class ConfiguracionComponent implements OnInit {

  nombre: string = '';
  correo: string = '';
  rol: string = '';

  numeroTelegram: string = '961-249-9197';
  direccionCorreo: string = '233412@ids.upchiapas.edu.mx';

  showTelegramModal: boolean = false;
  showEmailModal: boolean = false;

  editNumeroTelegram: string = '';
  editDireccionCorreo: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.nombre = user.Nombre;
        this.correo = user.Correo;
        this.rol = user.Rol;
      },
      error: (err) => {
        console.error('Error al cargar datos del usuario:', err);
        // Aquí podrías redirigir a login si hay error 401 o mostrar mensaje
      }
    });
  }

  openEditModal(type: 'telegram' | 'email') {
    if (type === 'telegram') {
      this.editNumeroTelegram = this.numeroTelegram;
      this.showTelegramModal = true;
    } else if (type === 'email') {
      this.editDireccionCorreo = this.direccionCorreo;
      this.showEmailModal = true;
    }
  }

  closeEditModal() {
    this.showTelegramModal = false;
    this.showEmailModal = false;
  }

  saveTelegram() {
    this.numeroTelegram = this.editNumeroTelegram;
    this.closeEditModal();
    alert('Número de Telegram actualizado a: ' + this.numeroTelegram);
  }

  saveEmail() {
    this.direccionCorreo = this.editDireccionCorreo;
    this.closeEditModal();
    alert('Dirección de Correo actualizada a: ' + this.direccionCorreo);
  }
}
