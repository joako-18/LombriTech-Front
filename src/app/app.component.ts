import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './features/landing/components/header/header.component';
import { HomeComponent } from './features/landing/pages/home/home.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [ HeaderComponent,CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lombritech';

  constructor(private router: Router) {}

  showHeader() {
    // Oculta el header en rutas de login, registro y dashboard
    return !['/login', '/registro', '/dashboard'].includes(this.router.url);
  }
}


