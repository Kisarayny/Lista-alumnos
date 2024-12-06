import { Component, OnInit } from '@angular/core';
import { ModalSensorsComponent } from "../../components/modal-sensors/modal-sensors.component";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-sensores',
  templateUrl: './sensores.page.html',
  styleUrls: ['./sensores.page.scss'],
})
export class SensoresPage implements OnInit {

  constructor(private modalController: ModalController) {}

  ngOnInit() {
  }
  async openSensorsModal() {
    const modal = await this.modalController.create({
      component: ModalSensorsComponent,
    });
    return await modal.present();
  }
}
