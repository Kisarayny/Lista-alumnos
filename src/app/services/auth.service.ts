import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  // Registro
  async register(email: string, password: string) {
    try {
      return await this.afAuth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      throw error;
    }
  }

  // Inicio de sesión
  async login(email: string, password: string) {
    try {
      return await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      throw error;
    }
  }

  // Cerrar sesión
  async logout() {
    try {
      return await this.afAuth.signOut();
    } catch (error) {
      throw error;
    }
  }

  // Obtener usuario actual
  getCurrentUser() {
    return this.afAuth.authState;
  }
}
