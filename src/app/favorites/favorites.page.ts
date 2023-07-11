import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { Favorite } from '../interfaces/favorite';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  constructor(private service:ServiceService) { }

  ngOnInit() {
    this.getAllFavorites();
  }

  favorites:Favorite[] = [];

  getAllFavorites(){
    this.service.getAllFavorites().subscribe(favorites => {
      this.favorites=favorites;
      console.log(this.favorites);
    })
  }



}
