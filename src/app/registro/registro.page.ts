import { Component, OnInit } from '@angular/core';
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

  constructor(public fb: FormBuilder) {
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
    console.log(this.nombre,
    this.apellidos,
    this.email,
    this.telefono,
    this.usuario)
  }
}
