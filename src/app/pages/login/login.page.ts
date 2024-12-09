import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa FormBuilder, FormGroup, Validators

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup; // Formulario reactivo

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder // Inyecta FormBuilder
  ) {
    // Crea el formulario con las validaciones
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], // Email obligatorio y con formato válido
      password: ['', [Validators.required, Validators.minLength(6)]], // Contraseña obligatoria y de al menos 6 caracteres
    });
  }

  // Método de login
  async login() {
    if (this.loginForm.invalid) { // Si el formulario es inválido
      return; // No hacer nada
    }

    const { email, password } = this.loginForm.value;

    try {
      await this.authService.login(email, password);
      this.router.navigate(['/home']); // Cambia 'home' por tu página principal
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  }

  // Métodos para obtener los controles del formulario
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
