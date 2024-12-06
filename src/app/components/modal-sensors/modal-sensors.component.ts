import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Motion } from '@capacitor/motion';
import {PluginListenerHandle} from "@capacitor/core";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-modal-sensors',
  templateUrl: './modal-sensors.component.html',
  styleUrls: ['./modal-sensors.component.scss'],
})
export class ModalSensorsComponent {
  constructor(private modalController: ModalController) {
  }
  acceleration: { x: number; y: number; z: number } | null = null;

  watchId: PluginListenerHandle | undefined;
  location: { latitude: number; longitude: number } | null = null;

  async getLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.location = {
      latitude: coordinates.coords.latitude,
      longitude: coordinates.coords.longitude,
    };
  }
  async startWatching() {
    this.watchId = await Motion.addListener('accel', (event: any) => {
      this.acceleration = {
        x: event.acceleration?.x || 0,
        y: event.acceleration?.y || 0,
        z: event.acceleration?.z || 0,
      };
    });
  }

  stopWatching() {
    if (this.watchId) {
      Motion.removeAllListeners();
      if (this.watchId !== null){
        this.watchId = undefined;
      }

    }
  }
  dismissModal() {
    this.modalController.dismiss();
  }

}
