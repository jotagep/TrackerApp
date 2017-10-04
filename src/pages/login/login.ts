import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, Slides, LoadingController, AlertController } from 'ionic-angular';

import { HomePage } from './../home/home';

import { UsuarioProvider } from './../../providers/usuario/usuario';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements AfterViewInit {


  @ViewChild(Slides) slides: Slides;
  clave: string = "";

  constructor(
    public navCtrl: NavController,
    private _usuario: UsuarioProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
  }

  ngAfterViewInit() {
    this.slides.lockSwipeToNext(true);
    this.slides.freeMode = true;
    this.slides.paginationType = "progress";
  }

  continuar() {

    let loader = this.loadingCtrl.create({
      content: "Verificando...",
    });
    loader.present();
    this._usuario.verifica_usuario(this.clave).then( val =>{
      loader.dismiss();

      if(val){
        //Avanzar slide
        this.slides.lockSwipeToNext(false);
        this.slides.slideNext();
        this.slides.lockSwipeToNext(true);
      }else{
        //Mostrar alerta
        this.alertCtrl.create({
          title: 'Clave incorrecta!',
          subTitle: 'Vuelva a intentarlo o contacte con el administrador',
          buttons: ['OK']
        }).present();
      }

    }).catch(err =>{
      loader.dismiss();
      console.log('Error: ' + JSON.stringify(err));
    })
  }

  ingresar() {
    this.navCtrl.setRoot(HomePage);
  }

}
