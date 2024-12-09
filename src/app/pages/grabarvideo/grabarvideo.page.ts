import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grabarvideo',
  templateUrl: './grabarvideo.page.html',
  styleUrls: ['./grabarvideo.page.scss'],
})
export class GrabarvideoPage implements OnInit {
  videoUrl: string | undefined;
  mediaRecorder: any;
  chunks: any[] = [];
  isRecording: boolean = false;
  videoStream: MediaStream | undefined;

  constructor() {}

  ngOnInit() {}

  async startRecording() {
    try {
      // Solicitar acceso a la cámara y al micrófono
      this.videoStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      // Crear un MediaRecorder para la grabación
      const mediaRecorder = new MediaRecorder(this.videoStream);
      this.isRecording = true;
      this.mediaRecorder = mediaRecorder;
      this.chunks = [];

      // Almacenamiento de los datos de la grabación
      mediaRecorder.ondataavailable = (event: any) => {
        this.chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(this.chunks, { type: 'video/webm' });
        this.videoUrl = URL.createObjectURL(blob);
      };

      mediaRecorder.start();
    } catch (error) {
      console.error('Error al acceder a la cámara', error);
    }
  }

  stopRecording() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      this.videoStream?.getTracks().forEach((track) => track.stop());
    }
    this.isRecording = false;
  }

  // Método para guardar o compartir el video grabado
  saveVideo() {
    if (this.videoUrl) {
      const link = document.createElement('a');
      link.href = this.videoUrl!;
      link.download = 'video_grabado.webm'; // Nombre del archivo
      link.click();
    } else {
      alert('No hay video para guardar.');
    }
  }
}
