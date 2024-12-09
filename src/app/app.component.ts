import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  // Método de registro
  register() {
    this.authService.register('email@dominio.com', 'password')
      .then(() => console.log('Usuario registrado'))
      .catch((error) => console.error(error));
  }

  // Método de login
  login() {
    this.authService.login('email@dominio.com', 'password')
      .then((userCredential) => console.log('Usuario logueado', userCredential))
      .catch((error) => console.error(error));
  }

  // Método de logout
  logout() {
    this.authService.logout()
      .then(() => console.log('Usuario deslogueado'))
      .catch((error) => console.error(error));
  }
}
