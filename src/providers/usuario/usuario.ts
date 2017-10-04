import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsuarioProvider {

  clave: string = "";

  constructor(
    private afDB: AngularFireDatabase,
    private storage: Storage,
    private platform: Platform
  ) {

  }

  verifica_usuario(clave: string) {
    clave = clave.toLowerCase();

    return new Promise((resolve, reject) => {
      this.afDB.list('/users/' + clave)
        .subscribe(data => {

          if (data.length === 0) {
            //Clave incorrecta
            resolve(false);
          } else {
            //Clave valida
            this.clave = clave
            this.guardar_storage()
            resolve(true);
          }
        })
    }).catch(err => {
      console.log('Error en promesa Provider: ' + JSON.stringify(err));
    })
  }

  guardar_storage() {
    return new Promise((resolve, reject) => {
      if (this.platform.is('cordova')) {
        //Dispositivo movil
        this.storage.set('clave', this.clave);
        resolve();
      } else {
        //Escritorio
        if (this.clave) {
          localStorage.setItem('clave', this.clave);
        }else{
          localStorage.removeItem('clave');
        }
        resolve();
      }
    })
  }

  cargar_storage() {
    return new Promise((resolve, reject)=> {
      if (this.platform.is('cordova')) {
        //Dispositivo movil
        this.storage.ready().then( () => {
          this.storage.get('clave').then( clave => {
            this.clave = clave;
            resolve();
          })
        })
      } else {
        //Escritorio
          this.clave = localStorage.getItem('clave');
          resolve();
      }
    });
  }

  reset_user() {
    this.clave = null;
    this.guardar_storage();
  }
}
