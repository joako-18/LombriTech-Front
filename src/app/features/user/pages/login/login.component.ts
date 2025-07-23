import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../user/services/user.service';
import { LoginRequest } from '../../../../core/models/user.model';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  correo = '';
  password = '';

  constructor(private userService: UserService, private router: Router) {}

  login() {
    const data: LoginRequest = { correo: this.correo, password: this.password };
    this.userService.login(data).subscribe({
      next: tokenResp => {
        console.log('Login exitoso, token:', tokenResp.access_token);
        this.userService.setToken(tokenResp.access_token);  // Guarda el token en localStorage
        this.router.navigate(['/vista-admin']); // Navega a la ruta protegida o dashboard
      },
      error: err => {
        alert('Error en login: ' + (err.error?.detail || err.message));
        console.error('Error login:', err);
      }
    });
  }
}
