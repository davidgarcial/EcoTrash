import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { ConductorPage } from '../pages/conductor/conductor';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Welcome } from '../pages/welcome/welcome';
import { Login } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { AutocompletePage } from '../pages/autocomplete/autocomplete';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

// Import the Animations module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Import the ButtonsModule
import { ButtonsModule } from '@progress/kendo-angular-buttons';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    Login,
    Welcome,
    SignupPage,
    TabsPage,
    ConductorPage,
    AutocompletePage,
  ],
  imports: [
    BrowserAnimationsModule,
    ButtonsModule,
    BrowserModule,
    HttpClientModule,
    Ng4GeoautocompleteModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    Login,
    ConductorPage,
    Welcome,
    SignupPage,
    TabsPage,
    AutocompletePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    ScreenOrientation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation
  ]
})
export class AppModule {}
