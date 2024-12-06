import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalRadioStreamingComponent} from "../../components/modal-radio-streaming/modal-radio-streaming.component";

@Component({
  selector: 'app-radio-streaming',
  templateUrl: './radio-streaming.page.html',
  styleUrls: ['./radio-streaming.page.scss'],
})
export class RadioStreamingPage {

  constructor(private modalController: ModalController) {}

  async openRadioModal() {
    const modal = await this.modalController.create({
      component: ModalRadioStreamingComponent
    });
    return await modal.present();
  }

}
