// vista-admin.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../../../core/models/user.model';
import { UserService } from '../../../user/services/user.service';
import { Router } from '@angular/router';
import { NavigateComponent } from '../../components/navigate/navigate.component';
import { RegistroComponent } from '../../components/registro/registro.component';

@Component({
  selector: 'app-vista-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, NavigateComponent, RegistroComponent],
  templateUrl: './vista-admin.component.html',
  styleUrls: ['./vista-admin.component.css']
})
export class VistaAdminComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  selectedRole: string = '';
  showRoleFilter: boolean = false;
  mostrarModalRegistro: boolean = false;
  mostrarModalEdicion: boolean = false;
  isRegistering: boolean = false;

  userToEdit: Partial<User & { apellidos: string; password?: string; password_confirm?: string }> = {};
  roles: string[] = ['Estudiante', 'Investigador'];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.applyFilters();
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
        alert('Error al cargar usuarios: ' + err.message);
        this.router.navigate(['/login']);
      }
    });
  }

  applyFilters() {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(user => {
      const matchesSearch = user.nombre.toLowerCase().includes(term) ||
        user.correo.toLowerCase().includes(term);
      const matchesRole = this.selectedRole === '' || user.rol === this.selectedRole;
      return matchesSearch && matchesRole;
    });
  }

  onSearchChange() {
    this.applyFilters();
  }

  onRoleFilterChange(role: string) {
    this.selectedRole = role;
    this.showRoleFilter = false;
    this.applyFilters();
  }

  toggleRoleFilter() {
    this.showRoleFilter = !this.showRoleFilter;
  }

  openRegisterModal() {
    this.mostrarModalRegistro = true;
  }

  closeRegisterModal() {
    this.mostrarModalRegistro = false;
  }

  registerUser(newUser: {
    tipoUsuario: string;
    nombre: string;
    apellido: string;
    email: string;
    contraseña: string;
    confirmarContraseña: string;
  }) {
    if (!this.isValidRegistration(newUser)) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }

    this.isRegistering = true;
    
    const userData = {
      nombre: newUser.nombre,
      apellidos: newUser.apellido,
      correo: newUser.email,
      password: newUser.contraseña,
      password_confirm: newUser.confirmarContraseña,
      rol: this.mapUserRole(newUser.tipoUsuario)
    };

    this.userService.registerUser(userData).subscribe({
      next: (registeredUser) => {
        this.isRegistering = false;
        alert('Usuario registrado correctamente');
        this.closeRegisterModal();
        this.loadUsers();
      },
      error: (err) => {
        this.isRegistering = false;
        console.error('Error en el registro:', err);
        let errorMessage = 'Error al registrar usuario';
        
        if (err.error && err.error.message) {
          errorMessage += `: ${err.error.message}`;
        } else if (err.message) {
          errorMessage += `: ${err.message}`;
        }
        
        alert(errorMessage);
      }
    });
  }

  private isValidRegistration(newUser: any): boolean {
    return (
      newUser.nombre && 
      newUser.apellido && 
      newUser.email &&
      newUser.contraseña && 
      newUser.confirmarContraseña &&
      newUser.contraseña === newUser.confirmarContraseña && 
      newUser.tipoUsuario
    );
  }

  private mapUserRole(tipoUsuario: string): string {
    switch(tipoUsuario) {
      case 'alumno': return 'Estudiante';
      case 'investigador': return 'Investigador';
      default: return 'Estudiante';
    }
  }

  openEditModal(user: User & { apellidos?: string }) {
    this.userToEdit = {
      id: user.id,
      nombre: user.nombre,
      apellidos: user.apellidos || '',
      correo: user.correo,
      rol: user.rol,
      password: '',
      password_confirm: '',
    };
    this.mostrarModalEdicion = true;
  }

  closeEditModal() {
    this.mostrarModalEdicion = false;
    this.userToEdit = {};
  }

  saveUserChanges() {
    if (
      this.userToEdit.nombre && 
      this.userToEdit.apellidos && 
      this.userToEdit.correo && 
      this.userToEdit.rol &&
      this.userToEdit.password !== undefined && 
      this.userToEdit.password_confirm !== undefined &&
      this.userToEdit.password === this.userToEdit.password_confirm
    ) {
      const { id, ...updateData } = this.userToEdit;

      this.userService.updateUser(id!, updateData).subscribe({
        next: updatedUser => {
          alert('Usuario actualizado correctamente');
          this.closeEditModal();
          this.loadUsers();
        },
        error: err => alert('Error al actualizar usuario: ' + err.message)
      });
    } else {
      alert('Por favor, complete todos los campos y asegure que las contraseñas coincidan.');
    }
  }

  deleteUser(userId: number) {
    if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          alert('Usuario eliminado');
          this.loadUsers();
        },
        error: err => alert('Error al eliminar usuario: ' + err.message)
      });
    }
  }
}