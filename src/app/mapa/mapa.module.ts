import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapaRoutingModule } from './mapa-routing.module';

import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


//google maps

import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { MapaComponent } from './mapa.component';


// Geolocation

import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapaRoutingModule,

    GoogleMapsModule,
    HttpClientJsonpModule,
    HttpClientModule

  ],
  providers:[
    Geolocation
  ],
  declarations: [MapaComponent]
})


export class MapaModule { }


