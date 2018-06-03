import { Component } from '@angular/core';
import { NavController, AlertController  } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {
  public url:string = "http://ecotrash20180317101643.azurewebsites.net/";
  public user:string;
  public pass:string;

  constructor(public navCtrl: NavController, public http: HttpClient,private alertCtrl: AlertController) {

  }

  login(){
    debugger;
    this.http.get(this.url+'User/Get/'+this.user).subscribe(
      result => {
        debugger;
        if(result != null){
          if(result['nombreUsuario'] == this.user && result['contrasenia'] == this.pass){
            localStorage.setItem('user',result['tipoUsuario']);
            localStorage.setItem('id',result['id']);
            localStorage.setItem('name',result['Nombres']);
            this.navCtrl.push(TabsPage, {}, {animate: false});
          }else{
            let alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: 'The user or password as wrong',
              buttons: ['Ok']
            });
            alert.present();
          }
        }else{
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'The user or password as wrong',
            buttons: ['Ok']
          });
          alert.present();
        }
      },
      error => {
          console.log(<any>error);
      }
    );
  }

  badLog() {
    let alert = this.alertCtrl.create({
      title: 'Low battery',
      subTitle: '10% of battery remaining',
      buttons: ['Dismiss']
    });
    alert.present();
  }
}