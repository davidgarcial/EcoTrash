import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { IgxGridModule } from 'igniteui-angular/grid/';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
 
  @ViewChild('myGrid', { read: IgxGridModule })
  public grid: IgxGridModule;
  public gridData;
  public url:string = "http://ecotrash20180317101643.azurewebsites.net/";

  constructor(public navCtrl: NavController, public http: HttpClient,private alertCtrl: AlertController) {
    this.http.get(this.url+'Order/GetOrders/'+(+(localStorage.getItem('id')))).subscribe(
      result => {
        this.gridData = result;
        console.log(result);
      },
      error => {
          console.log(<any>error);
      }
    );
  }
}