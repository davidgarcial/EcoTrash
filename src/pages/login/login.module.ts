import { NgModule } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { Login } from './login';
import { TabsPage } from '../tabs/tabs';

@NgModule({
  declarations: [
    Login,
  ],
  imports: [
    IonicPageModule.forChild(Login),
  ],
})
export class LoginPageModule {

  constructor(public navCtrl: NavController) {
  }

  login(){
    this.navCtrl.push(TabsPage)
  }
}
 