import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { Favorite } from '../interfaces/favorite';
import { AlertController,ToastController } from '@ionic/angular';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  constructor(public service:ServiceService,public toastController:ToastController,public alertController:AlertController) { }

  ngOnInit() {
    this.service.getWithExpiry("user")
    
    setTimeout(()=>{
      if (this.service.loggedIn){
        this.getAllFavorites();
      }
    },1000)
    
  }

  favorites:any = [];

  getAllFavorites(){
    console.log("Buscando los favoritos...")

    this.favorites = []

    //console.log(this.service.current_user)
    this.service.getAllFavorites().subscribe(favorites => {

      favorites.forEach(favorite => {
        let username = this.service.current_user.username
        if (favorite.username  == username){
          let datos_adicionales = this.service.hospitales.filter(x=>x.name === favorite.favorite_name)[0]
          this.favorites.push({favorite,datos_adicionales})
        }
      });

      //console.log(this.favorites);
    })
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
  }


  async informacion(favorite:any) {
    //console.log(favorite)
    //console.log("Ejecutado")
    let informacion_json = JSON.parse(favorite.datos_adicionales.informacion)
    const alert = await this.alertController.create({
      header: favorite.favorite.name,
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

      buttons: ['Cerrar']

    });

    await alert.present();
  }


  async eliminar(favorite:any) {
    //console.log(favorite)
    //console.log("Ejecutado")
    let informacion_json = JSON.parse(favorite.datos_adicionales.informacion)
    const alert = await this.alertController.create({
      header: "Estás seguro que desea eliminar este favorito?",
      message: '',

      buttons: 
      [
        'Cerrar',
        {
          text:"Eliminar",
          handler:()=>{
            this.eliminarFavorito(favorite)
          }
        }
      ]

    });

    await alert.present();
  }


  eliminarFavorito(favorite:any){
    //console.log(favorite)
    this.service.deleteFavorite(favorite.favorite.username_favorite).subscribe(()=>{
      this.presentToast("Se ha eliminado exitosamente!")
      this.getAllFavorites();
    },(err)=>{
      this.alerta(err.error.message)
    });
  }

}
