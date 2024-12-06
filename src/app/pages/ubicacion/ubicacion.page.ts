import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
// import { GoogleMap } from '@capacitor/google-maps';
@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.page.html',
  styleUrls: ['./ubicacion.page.scss'],
})
export class UbicacionPage {
  @ViewChild('map')
  mapRef: ElementRef<HTMLElement> | undefined;
  //newMap: GoogleMap | undefined;
  constructor() { }





}
