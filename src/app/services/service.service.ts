import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Favorite } from '../interfaces/favorite';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpClient:HttpClient) { }

  private api = "https://medlocator-node.fly.dev";

  //API Users

  getAllUsers(){
    const path=`${this.api}/users`;
    return this.httpClient.get<User[]>(path);
  }

  createUser(user:User){
    const path=`${this.api}/users`;
    return this.httpClient.post(path,user);
  }

  updateUser(user:User){
    const path=`${this.api}/users/${user.email}`;
    return this.httpClient.put<User[]>(path,user);
  }

  getUser(user:User){
    const path=`${this.api}/users/${user.email}`;
    return this.httpClient.get<User[]>(path);
  }

  deleteUser(user:User){
    const path=`${this.api}/users/${user.email}`;
    return this.httpClient.delete<User[]>(path);
  }

  //API Favorites
  
  getAllFavorites(){
    const path=`${this.api}/favorites`;
    return this.httpClient.get<Favorite[]>(path);
  }

  createFavorite(favorite:Favorite){
    const path=`${this.api}/favorites`;
    return this.httpClient.post(path,favorite);
  }

  updateFavorite(favorite:Favorite){
    const path=`${this.api}/favorites/${favorite.username_favorite}`;
    return this.httpClient.put<Favorite[]>(path,favorite);
  }

  getFavorite(favorite:Favorite){
    const path=`${this.api}/favorites/${favorite.username_favorite}`;
    return this.httpClient.get<Favorite[]>(path);
  }

  deleteFavorite(favorite:Favorite){
    const path=`${this.api}/favorites/${favorite.username_favorite}`;
    return this.httpClient.delete<Favorite[]>(path);
  }

}
