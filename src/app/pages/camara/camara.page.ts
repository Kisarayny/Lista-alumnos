import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import {ModalCamaraComponent} from "../../components/modal-camara/modal-camara.component";

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage implements OnInit {


  constructor(private modalController: ModalController) {}

  ngOnInit() {
  }

  async openCameraModal() {
    const modal = await this.modalController.create({
      component: ModalCamaraComponent,
    });
    return await modal.present();
  }

}
