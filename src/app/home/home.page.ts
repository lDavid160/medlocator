import { Component, OnInit } from '@angular/core';
import { AlertController,ToastController } from '@ionic/angular';
import { ServiceService } from '../services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public toastController:ToastController,public router:Router,public service:ServiceService,public alertController: AlertController) {}

  ngOnInit(): void {
    this.service.getWithExpiry("user")
    // if (!this.service.loggedIn){
    //   console.log("No has iniciado sesión!")
    //   setTimeout(()=>{
    //     this.router.navigate(['./login'])
    //   },2000)
    // }
  }

  hospitales = this.service.hospitales

  async informacion(informacion_string:string,name:string) {
    console.log("Ejecutado")
    let informacion_json = JSON.parse(informacion_string)
    const alert = await this.alertController.create({
      header: name,
      message: '',
      cssClass: 'alerta_estilo',
      inputs:[
        {
          name:"Dirección",
          type:"textarea",
          placeholder:`Dirección:  ${informacion_json.direccion}`,
          disabled:false
        },
        {
          name:"Especialidades",
          type:"textarea",
          placeholder:`Especialidades:  ${informacion_json.especialidades}`,
          disabled:false
        },
        {
          name:"Longitud",
          type:"textarea",
          placeholder:`Longitud:  ${informacion_json.longitud}`,
          disabled:false
        },
        {
          name:"Latitud",
          type:"textarea",
          placeholder:`Latitud:  ${informacion_json.latitud}`,
          disabled:false
        }
      ],

      buttons: [
        'Cerrar',
      {
        text:"Añadir a Favorito",
        handler:(data)=>{
          console.log("Creando Favorito")
          this.crearFavoritoInterfaz(name)
        }
      }
    ]


    });

    await alert.present();
  }


  async crearFavoritoInterfaz(name_hospital:string) {
    const alert = await this.alertController.create({
      header: "Creando Favorito!",
      message: '',
      inputs:[
        {
          name:"favorite_custom_name",
          type:"text",
          placeholder:`Ingrese un nombre personalizado!`,
          disabled:false
        }
      ],

      buttons: [
        'Cerrar',
      {
        text:"Guardar",
        handler:(data)=>{
          this.crearFavorito(name_hospital,data.favorite_custom_name)
        }
      }
    ]


    });

    await alert.present();
  }

  crearFavorito(name_hospital:string,favorite_custom_name_:string){
    
    //console.log(this.service.current_user)

    let user_name = this.service.current_user.username

    let favorite = {
      _id:`${user_name}_${name_hospital}`,
      username_favorite:`${user_name}_${name_hospital}`,
      username:user_name,
      favorite_name:name_hospital,
      favorite_custom_name:favorite_custom_name_
    }

    this.service.createFavorite(favorite).subscribe((data)=>{
      //this.getAllProductos();
      this.presentToast("El favorito fue creado correctamente");
    },(err)=>{
      this.alerta(err.error.message)
    });
  }

  async presentToast(message:string){
    const toast = await this.toastController.create({
      message:message,
      duration:3000
    });
    toast.present();
  }

  async alerta(txt:string) {
    console.log("Ejecutando Alerta")
    const alert = await this.alertController.create({
      header: "Información",
      message: txt,
      buttons: ['Cerrar']

    });

    await alert.present();
  }
  
}




