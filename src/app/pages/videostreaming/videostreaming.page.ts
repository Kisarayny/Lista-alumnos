import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-videostreaming',
  templateUrl: './videostreaming.page.html',
  styleUrls: ['./videostreaming.page.scss'],
})
export class VideoStreamingPage {
  // Define directamente el enlace al video de YouTube
  videoLink: string = 'https://www.youtube.com/watch?v=10JQ5pOMbQE'; // Video predeterminado
  videoUrl: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  // Se llama al cargar la página para cargar el video automáticamente
  ngOnInit() {
    this.loadVideo();
  }

  // Función para cargar el video automáticamente
  loadVideo() {
    const videoId = this.extractVideoId(this.videoLink);
    if (videoId) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${videoId}`
      );
    } else {
      alert('Enlace no válido');
    }
  }

  // Extrae el ID del video desde el enlace
  extractVideoId(url: string): string | null {
    const regExp = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*v=([^&]+)|youtu\.be\/([^?]+)/;
    const match = url.match(regExp);
    return match ? match[1] || match[2] : null;
  }
}
  