
import { Component, OnInit } from '@angular/core';
import { NavigateComponent } from '../../components/navigate/navigate.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroComponent } from '../../components/registro/registro.component';

export interface User {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
}

@Component({
  selector: 'app-vista-admin',
  imports: [NavigateComponent,
     CommonModule, FormsModule, RegistroComponent],
  templateUrl: './vista-admin.component.html',
  styleUrl: './vista-admin.component.css'
})
export class VistaAdminComponent implements OnInit {
  constructor(private router: Router) {}

  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  selectedRole: string = '';
  showRoleFilter: boolean = false;
  mostrarRegistro: boolean = false;
  
  roles: string[] = ['Estudiante', 'Investigador'];

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    // Aquí conectarías con tu servicio para obtener usuarios
    // this.userService.getUsers().subscribe(users => {
    //   this.users = users;
    //   this.applyFilters();
    // });
  }

  applyFilters() {
    this.filteredUsers = this.users.filter(user => {
      const matchesSearch = user.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           user.correo.toLowerCase().includes(this.searchTerm.toLowerCase());
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

mostrarModalRegistro: boolean = false;

openRegisterModal() {
  this.mostrarModalRegistro = true;
}

closeRegisterModal() {
  this.mostrarModalRegistro = false;
}


  toggleRoleFilter() {
    this.showRoleFilter = !this.showRoleFilter;
  }

  editUser(userId: number) {
 
    console.log('Editar usuario:', userId);
  }

  deleteUser(userId: number) {
    if (confirm('¿Está seguro de que desea eliminar este usuario?')) {

    }
  }


}