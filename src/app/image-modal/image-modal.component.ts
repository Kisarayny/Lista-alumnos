import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
})
export class ImageModalComponent {
  @Input() image: string | null = null; // Recibimos la imagen desde el componente padre

  constructor(private modalController: ModalController) {}

  // Cerrar el modal
  closeModal() {
    this.modalController.dismiss();
  }
}
