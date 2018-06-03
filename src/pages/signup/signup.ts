import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Welcome } from '../welcome/welcome';

export interface User {
  Nombres: string;
  Apellidos: string;
  Direccion: string;
  NombreUsuario: string;
  Contrasenia: string;
  Correo: string;
}

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})

export class SignupPage {

  public url:string = "http://ecotrash20180317101643.azurewebsites.net/";
  public user:string;
  public pass:string;
  public name:string;
  public lastName:string;
  public email:string;

  constructor(public navCtrl: NavController, public http: HttpClient,private alertCtrl: AlertController) {

  }

  login(){
    if(this.user && this.pass && this.name && this.lastName && this.email){
      let user :User = {
        Nombres: this.name,
        Apellidos: this.lastName,
        Direccion: 'none',
        NombreUsuario: this.user,
        Contrasenia: this.pass,
        Correo: this.email
      };
      
      this.http.post(this.url+'User/Create',user).subscribe(
        result => {
            console.log(result);
        },
        error => {
            console.log(<any>error);
        }
      );
    }
    else
    {
      let alert = this.alertCtrl.create({
        title: 'Logged',
        subTitle: 'You are logged',
        buttons: [
          {
          text: 'Ok',
          handler: () => {
            localStorage.clear();
            this.navCtrl.push(Welcome, {}, {animate: false});
          }
        }]
      });
      alert.present();
    }
  }
}
