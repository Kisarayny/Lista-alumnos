import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';  // Para obtener la ubicación

declare var google: any; 

@Component({
  selector: 'app-mapa',
  templateUrl: 'mapa.page.html',
  styleUrls: ['mapa.page.scss'],
})
export class MapaPage {
  map: any;  // Variable para almacenar el mapa
  marker: any;  // Variable para almacenar el marcador

  constructor() {}

  ngOnInit() {
    this.initMap();  // Inicializamos el mapa al cargar la página
  }

  initMap() {
    // Inicializa el mapa con una ubicación predeterminada (por ejemplo, centro del mundo)
    const mapOptions = {
      center: new google.maps.LatLng(0, 0),  // Ubicación predeterminada
      zoom: 2,
    };
    
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);  // Creamos el mapa en el contenedor
  }
  async getLocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      console.log('Ubicación obtenida:', coordinates.coords);  // Muestra las coordenadas en consola
  
      // Actualizamos el mapa con la ubicación del usuario
      const userLocation = new google.maps.LatLng(coordinates.coords.latitude, coordinates.coords.longitude);
      this.map.setCenter(userLocation);
      this.map.setZoom(15);
  
      // Si ya hay un marcador, lo removemos para evitar varios marcadores
      if (this.marker) {
        this.marker.setMap(null);
      }
  
      // Creamos un nuevo marcador en la ubicación actual del usuario
      this.marker = new google.maps.Marker({
        position: userLocation,
        map: this.map,
        title: '¡Estás aquí!',
      });
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
      alert('No se pudo obtener la ubicación. Asegúrate de haber dado los permisos.');
    }
  }
  
}
