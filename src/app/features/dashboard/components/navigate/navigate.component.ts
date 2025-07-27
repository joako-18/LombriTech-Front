import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../user/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.css']
})
export class NavigateComponent implements OnDestroy {
  sidebarOpen = false;
  mostrarEstadisticas = true;
  userRole: string | null = null;
  private roleSubscription?: Subscription;

  constructor(public router: Router, private authService: AuthService) {
    // Suscribirse al observable para actualizar rol en tiempo real
    this.roleSubscription = this.authService.role$.subscribe(role => {
      this.userRole = role;
    });
  }

  ngOnDestroy() {
    this.roleSubscription?.unsubscribe();
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }

  toggleEstadisticas(): void {
    this.mostrarEstadisticas = !this.mostrarEstadisticas;
  }

navigate(ruta: string): void {
  if (ruta === '/vista-admin' && this.userRole !== 'administrador') {
    return; // evita navegación si no es admin
  }
  this.router.navigate([ruta]);
  this.closeSidebar();
}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
