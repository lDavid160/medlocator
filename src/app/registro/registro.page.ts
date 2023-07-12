import { Component, OnInit } from '@angular/core';

import { AlertController,ToastController } from '@ionic/angular';

import { ServiceService } from '../services/service.service';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
}from '@angular/forms'


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(private service:ServiceService,public toastController: ToastController,public alertController: AlertController,public fb: FormBuilder) {
    this.formularioRegistro= this.fb.group({
      'nombre':new FormControl("",Validators.required),
      'apellidos':new FormControl("",Validators.required),
      'email':new FormControl("",Validators.required),
      'telefono':new FormControl("",Validators.required),
      'usuario':new FormControl("",Validators.required),
      'password':new FormControl("",Validators.required),
      'confirmacionPassword':new FormControl("",Validators.required),
    })

  }

  nombre="";
  apellidos="";
  email="";
  telefono="";
  usuario="";
  password="";
  confirmacionPassword="";


  ngOnInit() {
  }
  guardar(){

    let nombre = this.nombre
    let apellidos = this.apellidos
    let email = this.email
    let telefono = this.telefono
    let usuario = this.usuario
    let password = this.password
    let confirmacionPassword = this.confirmacionPassword

    let txt = ""

    if (this.password != this.confirmacionPassword) {
      txt = "Las contraseñas no conciden!"
    } else if ( this.usuario.length < 4) {
      txt = "El usuario debe conterer mas caracteres!"
    } else {

      const user = {
        _id:email, email:email, username:usuario, password:password, first_name:nombre, last_name:apellidos, phone_number:telefono, expiry:0
      }

      this.service.createUser(user).subscribe((data)=>{
        //this.getAllProductos();
        this.presentToast("El usuario fue creado correctamente");
      });
    }

    if (txt != "") {
      this.alerta(txt)
    }

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
