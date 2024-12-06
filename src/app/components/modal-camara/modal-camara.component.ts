import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { PhotoService } from '../../services/photo.service';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {ModalController} from "@ionic/angular";
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-modal-camara',
  templateUrl: './modal-camara.component.html',
  styleUrls: ['./modal-camara.component.scss'],
})
export class ModalCamaraComponent  implements AfterViewInit {

  imageUrl: string | undefined;
  isDesktop: boolean = false;
  videoStreamActive = false;

  @ViewChild('video', { static: false }) video!: ElementRef<HTMLVideoElement>;

  constructor(private modalController: ModalController) {
    this.isDesktop = !this.isMobile();
  }
  ngAfterViewInit() {
    // Solo llama a la cámara si es escritorio
    if (this.isDesktop) {
      this.takePhotoWithWebCamera();
    }
  }

  isMobile(): boolean {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }
  async takePhoto() {
    if (this.isDesktop) {
      await this.takePhotoWithWebCamera();
    } else {
      await this.takePhotoWithCapacitorCamera();
    }
  }

  // Para PWA en computadoras
  async takePhotoWithWebCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      this.videoStreamActive = true;
      this.video.nativeElement.srcObject = stream;

      // Esperar un poco antes de capturar la imagen
      setTimeout(() => {
        this.captureImageFromVideo(stream);
      }, 1000);

    } catch (error) {
      console.error('Error accediendo a la cámara:', error);
    }
  }

  captureImageFromVideo(stream: MediaStream) {
    const canvas = document.createElement('canvas');
    const video = this.video.nativeElement;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.imageUrl = canvas.toDataURL('image/png'); // Capturar la imagen como DataURL
    }

    // Detener el stream de la cámara
    stream.getTracks().forEach(track => track.stop());
    this.videoStreamActive = false;
  }
  async takePhotoWithCapacitorCamera() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });
    this.imageUrl = image.dataUrl;
  }
  dismissModal() {
    this.modalController.dismiss();
  }
  async saveToGallery() {
    if (this.imageUrl) {
      const fileName = `photo_${new Date().getTime()}.png`;
      await Filesystem.writeFile({
        path: fileName,
        data: this.imageUrl,
        directory: Directory.Documents, // Adjust to Gallery if supported on your platform
      });
      alert('Image saved to gallery.');
    }
  }

  async shareImage() {
    if (this.imageUrl) {
      try {
        // Convert base64 image to a file and get its URI
        const fileName = `photo_${new Date().getTime()}.png`;
        const savedFile = await Filesystem.writeFile({
          path: fileName,
          data: this.imageUrl.split(',')[1], // Remove the data URL prefix
          directory: Directory.Cache,
        });

        // Share the file using its URI
        await Share.share({
          title: 'Check out this photo!',
          text: 'I just captured this image.',
          url: savedFile.uri, // Use the file URI for sharing
          dialogTitle: 'Share Image',
        });
      } catch (error) {
        console.error('Error sharing image:', error);
        alert('Unable to share the image.');
      }
    } else {
      alert('No image to share.');
    }
  }
}
