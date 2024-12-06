import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { NativeAudio } from '@capacitor-community/native-audio';

@Component({
  selector: 'app-modal-radio-streaming',
  templateUrl: './modal-radio-streaming.component.html',
  styleUrls: ['./modal-radio-streaming.component.scss'],
})
export class ModalRadioStreamingComponent {

  streamUrl = 'http://24363.live.streamtheworld.com:3690/XEPHAM_SC';
  audio: HTMLAudioElement | null = null;
  audioId = 'radioStream';

  constructor(private modalController: ModalController) {}

  async preloadAudio() {
    if (Capacitor.isNativePlatform()) {
      try {
        await NativeAudio.preload({
          assetId: this.audioId,
          assetPath: this.streamUrl,
          volume: 1.0,
          isUrl: true
        });
      } catch (error) {
        console.error('Error preloading audio:', error);
      }
    }
  }
  async playRadio() {
    if (Capacitor.isNativePlatform()) {
      // Optionally use Capacitor Media plugin
      console.log('Media plugin can be configured here');
      try {
        await NativeAudio.play({ assetId: this.audioId });
      } catch (error) {
        console.error('Error playing radio:', error);
      }
    } else {
      // Use HTML5 audio for browser
      if (!this.audio) {
        this.audio = new Audio(this.streamUrl);
        this.audio.play();
      }
    }
  }

  async stopRadio() {
    if (Capacitor.isNativePlatform()){
      try {
        await NativeAudio.stop({ assetId: this.audioId });
      } catch (error) {
        console.error('Error stopping radio:', error);
      }
    }
    else if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  }

  closeModal() {
    this.stopRadio();
    this.modalController.dismiss();
  }

}
