import { Component } from '@angular/core';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { ConductorPage } from '../conductor/conductor';
import { HomePage } from '../home/home';
import { Welcome } from '../welcome/welcome';
import { NavController, AlertController  } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  public identity;
  public tab1Root = HomePage;
  public isConductor = localStorage.getItem('user') == 'C' ? true : false;
  public tab3Root = this.isConductor ? ConductorPage : AboutPage;
  public tab2Root = ContactPage;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {
    //this.navCtrl.pop({animate: false});
    
  }

  logout(){
    let alert = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you want logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Ok',
          handler: () => {
            localStorage.clear();
            this.navCtrl.push(Welcome, {}, {animate: false}); 
          }
        }
      ]
    });
    alert.present();
  }
}
