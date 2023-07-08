import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [

    { title: 'Hospitales', url: '/home', icon: 'medkit' },
    { title: 'Favoritos', url: '/favorites', icon: 'heart' },
  ];

  constructor() {}
}