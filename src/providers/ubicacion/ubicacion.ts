import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

import { UsuarioProvider } from './../usuario/usuario';

import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UbicacionProvider {

  user: FirebaseObjectObservable<any>
  private watch: any;

  constructor(
    private geolocation: Geolocation,
    private afDB: AngularFireDatabase,
    private _usuario: UsuarioProvider
  ) {
    console.log('Hello UbicacionProvider Provider');
  }

  iniciar_localizacion() {
    this.user = this.afDB.object('/users/' + this._usuario.clave);
    this.watch = this.geolocation.watchPosition()
      .subscribe((data) => {
        // data can be a set of coordinates, or an error (if an error occurred).
        // data.coords.latitude
        // data.coords.longitude
        if(!this._usuario.clave){
          return;
        }
        console.log(data);
        this.user.update({ lat: data.coords.latitude, lng: data.coords.longitude });
      });
  }

  detener_localizacion() {
    this.watch.unsubscribe();
    this._usuario.reset_user();
  }
}
