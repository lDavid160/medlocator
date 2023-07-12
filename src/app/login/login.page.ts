import { Component, OnInit } from '@angular/core';

import { AlertController,ToastController } from '@ionic/angular';

import { ServiceService } from '../services/service.service';

import { Router } from '@angular/router';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
}from '@angular/forms'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(private router: Router,private service:ServiceService,public toastController: ToastController,public alertController: AlertController,public fb: FormBuilder) {

    this.formularioLogin = this.fb.group({
      'email': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required)
    })

  }

  email = "";
  password = "";

  ngOnInit() {
    
  }

  setWithExpiry(key:string, value:string, ttl:number) {
    const now = new Date()

    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    }
    localStorage.setItem(key, JSON.stringify(item))
    
    let item_expiry = item.expiry

    const user = {
      _id:this.usuario.email, email:this.usuario.email, username:this.usuario.usuario, password:this.usuario.password, first_name:this.usuario.nombre, last_name:this.usuario.apellidos, phone_number:this.usuario.telefono, expiry:item_expiry
    }
    this.service.current_user = JSON.parse(JSON.stringify(user))
    this.service.updateUser(user).subscribe((data)=>{
      //this.getAllProductos();
      console.log("Actualizada fecha de expiración sesión usuario")
    });

  }

  
  usuario:any;

  ingresar(){


    let txt = ""

    console.log("Verificando ingreso...")

    this.service.getUser(this.email).subscribe((data)=>{
      //console.log(data)
      this.usuario = data
      this.verificarPassword()
      //this.getAllProductos();
      //this.presentToast("El usuario fue creado correctamente");
    },(err)=>{
      console.log(err.error.message)
      txt = err.error.message

      this.alerta(txt)
      
    })

  }

  verificarPassword(){
    if (this.password != this.usuario.password){
      
      let txt = "Contraseña incorrecta"
      this.alerta(txt)

    } else {
      
      let txt = "Datos correctos!"
      this.presentToast(txt)
      this.iniciarSesion()

    }
  }

  iniciarSesion(){
    this.service.loggedIn = true
    this.setWithExpiry("user",this.usuario.email,3000000) //300000 5 mins
    this.service.inicio_reciente = true
    this.router.navigate(['/mapa'])
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

  async presentToast(message:string){
    const toast = await this.toastController.create({
      message:message,
      duration:3000
    });
    toast.present();
  }


}
