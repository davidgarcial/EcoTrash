import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Login } from '../login/login';
import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})

export class Welcome {
  constructor(public navCtrl: NavController) {
    if(typeof (Storage) != undefined){
      if(localStorage.getItem('user')){
        this.navCtrl.push(TabsPage, {}, {animate: false});
      }
      else
      {
        
      }
    } 
  }

  login(){
  this.navCtrl.push(Login);
  }

  signup(){
  this.navCtrl.push(SignupPage);
  }
}