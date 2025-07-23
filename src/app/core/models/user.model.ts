interface NewUser {
  tipoUsuario: string;
  nombre: string;
  apellido: string;
  email: string;
  contraseña: string;
  confirmarContraseña: string;
}
export interface User {
  id: number;
  nombre: string;
  apellidos: string;
  correo: string;
  rol: string;
}

export interface LoginRequest {
  correo: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}
