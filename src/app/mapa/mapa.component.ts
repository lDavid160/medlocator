import { Component, OnInit } from '@angular/core';

//maps

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Geolocation

import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent  implements OnInit {

  apiLoaded: Observable<boolean>;

  constructor(private geo:Geolocation,httpClient: HttpClient) { 
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyBoiUfgPaT0CZCKFm9CSdbPIYLrpSCtcvI', 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
    
    console.log(this.apiLoaded)
  }
  
  coords:any;

  async locate(){
    let coordinates:any;
    await this.geo.getCurrentPosition().then((res) =>{
      coordinates = res;
    }).catch((err)=>{
      console.log(err);
    });
    this.coords = coordinates.coords;
    console.log("Tus coordenadas actuales son: ",this.coords);
    this.actualizarCoords();
  }

  options: google.maps.MapOptions = {
    center: {lat: 5.070275, lng: -75.513817},
    //center: {lat:  this.coords.latitude, lng: this.coords.longitude},
    zoom: 16
  };

  circleCenter: google.maps.LatLngLiteral = {lat: 5.070275, lng: -75.513817};
  radius = 3;

  display?: google.maps.LatLngLiteral;

  
  // cada que se mueve el mapa cambia el centro
  moveMap(event: google.maps.MapMouseEvent) {
    this.options.center = (event.latLng?.toJSON());
  }
  

  // cada que el cursor se desplaza por el mapa cambian la longitud y latitud
  move(event: google.maps.MapMouseEvent) {
    this.display = event.latLng?.toJSON();
  }
  
  //Luego de obtener las coordenadas actuales se pasan al mapa
  actualizarCoords(){
    if(this.options.center != null){
      this.options.center.lat = this.coords.latitude;
      this.options.center.lng = this.coords.longitude;

      this.circleCenter.lat = this.coords.latitude;
      this.circleCenter.lng = this.coords.longitude;

      
      if (this.display != null){
        this.display.lat = this.coords.latitude;
        this.display.lng = this.coords.longitude;

        console.log("Coordenadas actualizadas a ",this.display);

      }
    }
  }

  // Marker options

  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null){
      this.markerPositions.push(event.latLng.toJSON());
    }
  }
  

  ngOnInit() {

    //this.locate();

  }

}
