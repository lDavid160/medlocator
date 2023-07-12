import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { MapaComponent } from '../mapa/mapa.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  {
    path: './mapa',
    component: MapaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
