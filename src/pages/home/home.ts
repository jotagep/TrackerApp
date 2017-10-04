import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UbicacionProvider } from './../../providers/ubicacion/ubicacion';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  name: string;
  lat: number;
  lng: number;

  constructor(
    public navCtrl: NavController,
    private _ubicacion: UbicacionProvider
  ) {
    this._ubicacion.iniciar_localizacion();
    this._ubicacion.user.subscribe(data => {
      this.name = data.nombre;
      this.lat = data.lat;
      this.lng = data.lng;
    });
  }

  logout() {
    this._ubicacion.detener_localizacion();
    this.navCtrl.setRoot('LoginPage');
  }

}
