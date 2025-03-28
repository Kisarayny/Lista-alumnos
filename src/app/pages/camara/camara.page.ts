import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { AngularFirestore } from '@angular/fire/compat/firestore'; 
import { AngularFireStorage } from '@angular/fire/compat/storage'; // Añadir esta importación
import { AngularFireFunctions } from '@angular/fire/compat/functions'; // Añadir esta importación
import { ModalController } from '@ionic/angular';
import { ModalCamaraComponent } from '../../components/modal-camara/modal-camara.component';
import { finalize } from 'rxjs/operators'; // Importar finalize

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage implements OnInit {
  imageUrl: string | undefined;
  profesor = { nombre: '', materia: '', email: '', telefono: '', imageUrl: '' }; // Añadir imageUrl
  uploading = false;

  constructor(
    private modalController: ModalController,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private storage: AngularFireStorage, // Inyectar AngularFireStorage
    private fns: AngularFireFunctions // Inyectar AngularFireFunctions
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  private async loadUserProfile() {
    try {
      const user = await this.afAuth.currentUser;
      if (user && user.email) {
        const docRef = this.afs.collection('profesores').doc(user.email);
        const doc = await docRef.get().toPromise();
        if (doc && doc.exists) {
          this.profesor = doc.data() as any;
        } else {
          console.log('No se encontró el perfil del profesor');
        }

      }
    } catch (error) {
      console.error('Error al cargar el perfil:', error);
    }
  }

  async openCameraModal() {
    const modal = await this.modalController.create({
      component: ModalCamaraComponent,
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data && data.imageUrl) {
      this.imageUrl = data.imageUrl;
    }
  }

  async guardarInformacion() {
    if (!this.profesor.nombre || !this.profesor.materia || !this.profesor.email || !this.profesor.telefono) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    this.uploading = true;
    let uploadedImageUrl = this.imageUrl;

    if (this.imageUrl && !this.imageUrl.startsWith('http')) {
      const filePath = `profesores/${Date.now()}.jpg`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.imageUrl);

      await task.snapshotChanges().pipe(
        finalize(async () => {
          uploadedImageUrl = await fileRef.getDownloadURL().toPromise();
          this.saveToFirestore(uploadedImageUrl);
        })
      ).toPromise();
    } else {
      this.saveToFirestore(uploadedImageUrl);
    }
  }

  private async saveToFirestore(imageUrl: string | undefined) {
    const callable = this.fns.httpsCallable('saveProfessorData');
    try {
      const result = await callable({ ...this.profesor, imageUrl }).toPromise();
      alert(result.message);
    } catch (error: any) {
      alert('Error al guardar: ' + error?.message || 'Error desconocido');
    }
    
    
    this.uploading = false;
  }
}
