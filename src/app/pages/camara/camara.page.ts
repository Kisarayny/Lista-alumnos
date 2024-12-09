import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalCamaraComponent } from '../../components/modal-camara/modal-camara.component';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage implements OnInit {
  imageUrl: string | undefined; // Para almacenar la foto
  profesor = {
    nombre: '',
    materia: '',
    email: '',
    telefono: '',
  }; // Objeto para los datos del profesor

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async openCameraModal() {
    const modal = await this.modalController.create({
      component: ModalCamaraComponent,
    });

    await modal.present();

    // Recibe la foto al cerrar el modal
    const { data } = await modal.onDidDismiss();
    if (data && data.imageUrl) {
      this.imageUrl = data.imageUrl;
    }
  }

  guardarInformacion() {
    console.log('Información guardada:', this.profesor);
    console.log('Foto del profesor:', this.imageUrl);
    alert('Información del profesor guardada exitosamente.');
  }
}
