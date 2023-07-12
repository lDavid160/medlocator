import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { AlertController,ToastController } from '@ionic/angular';


//maps

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ServiceService } from '../services/service.service';

// Geolocation

import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { GoogleMap, GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent  implements OnInit {

  apiLoaded: Observable<boolean>;

  constructor(public toastController: ToastController,public alertController: AlertController,public service:ServiceService,private geo:Geolocation,public httpClient: HttpClient) { 
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

  // options: google.maps.MapOptions = {
  //   center: {lat: 5.070275, lng: -75.513817},
  //   //center: {lat:  this.coords.latitude, lng: this.coords.longitude},
  //   zoom: 16
  // };

  center: google.maps.LatLngLiteral = {lat: 5.070275, lng: -75.513817};
  zoom = 16;
  display?: google.maps.LatLngLiteral;

  //mapa?: google.maps.Map;

  @ViewChild(GoogleMap) map:GoogleMap | undefined
  @ViewChild(MapInfoWindow) map_info:MapInfoWindow | undefined
 

  circleCenter?: google.maps.LatLngLiteral;
  radius = 3;

  
  // cada que se mueve el mapa cambia el centro
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.center = (event.latLng?.toJSON());
    }
  }
  

  // cada que el cursor se desplaza por el mapa cambian la longitud y latitud
  move(event: google.maps.MapMouseEvent) {
    this.display = event.latLng?.toJSON();
  }
  
  //Luego de obtener las coordenadas actuales se pasan al mapa
  actualizarCoords(){
    
    if(this.center != null){
      this.center.lat = this.coords.latitude;
      this.center.lng = this.coords.longitude;

      this.circleCenter = {lat: this.coords.latitude, lng: this.coords.longitude}

      // this.circleCenter.lat = this.coords.latitude;
      // this.circleCenter.lng = this.coords.longitude;

      
      if (this.display != null){
        this.display.lat = this.coords.latitude;
        this.display.lng = this.coords.longitude;

        console.log("Coordenadas actualizadas a ",this.display);
      }

      this.map?.panTo(this.center)
  

    }

  }

  mostrarHospitales(){
    if (this.markerPositionsInput.length == 0){
      let hospitales = this.service.hospitales

      hospitales.forEach(hospital => {
        let hospital_coords = {
          position: {
            lng: parseFloat(JSON.parse(hospital.informacion).longitud),
            lat: parseFloat(JSON.parse(hospital.informacion).latitud)
          },
          label: {
            color:'blue',
            text: hospital.name
          },
          title: `${hospital.name} \n\n ${JSON.parse(hospital.informacion).especialidades}`,
          options: {animation: google.maps.Animation.BOUNCE},
          
        } 
        //console.log(hospital_coords)
        this.markerPositionsInput.push(hospital_coords)
        //this.markerInfos.push(hospital.name)
      });
    } else {
      console.log("Ya estan cargados los hospitales!")
      this.presentToast("Ya estan cargados los hospitales!")
    }
    
  }

  // Marker options

  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];

  markerPositionsInput:any[] = []

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null){
      this.markerPositions.push(event.latLng.toJSON());
    }
  }

  infoContent = ""

  openWindow(marker:MapMarker,content:any){

    if(this.map_info != undefined){
      this.infoContent = content
      this.map_info.open(marker)
    }
  }

  async presentToast(message:string){
    const toast = await this.toastController.create({
      message:message,
      duration:3000
    });
    toast.present();
  }
  

  ngOnInit() {

    //this.locate();
    this.service.getWithExpiry("user")
  }

}
