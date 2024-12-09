import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular'; // Importa AlertController

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController // Inyecta AlertController
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], // Email obligatorio y con formato válido
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$') // Contraseña con al menos una mayúscula, minúscula y número
        ],
      ],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
    }, {
      validators: this.passwordMatchValidator // Validación personalizada para que las contraseñas coincidan
    });
  }

  // Método de registro
  async register() {
    if (this.registerForm.invalid) {
      return;
    }

    const { email, password } = this.registerForm.value;

    try {
      await this.authService.register(email, password);
      this.router.navigate(['/login']);
    } catch (error: any) { // Esto le dice a TypeScript que el tipo de 'error' es 'any'
      if (error?.code === 'auth/email-already-in-use') {
        this.showEmailErrorAlert(); // Llama a la función para mostrar la alerta
      } else {
        console.error('Error al registrar:', error);
      }
    }
  }

  // Función para mostrar alerta de correo electrónico ya registrado
  async showEmailErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'El correo electrónico ya está registrado.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  // Métodos para obtener los controles del formulario
  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  // Validación personalizada para las contraseñas coincidan
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
    }
  }
}
