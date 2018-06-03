import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

declare var google;

@IonicPage()
@Component({
  selector: 'page-conductor',
  templateUrl: 'conductor.html',
})
export class ConductorPage {

  @ViewChild('map') mapElement: ElementRef;
  public url:string = "http://ecotrash20180317101643.azurewebsites.net/";
  map: any;
  start = new google.maps.LatLng(25.711081099999998, -100.34333449999997);
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  public name:string = "PICKUP";

  constructor(public navCtrl: NavController,public http: HttpClient,private alertCtrl: AlertController) {

  }
 
  ionViewDidLoad(){
    this.initMap();
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });

    this.directionsDisplay.setMap(this.map);

    this.name = "PICKUP";
      this.http.get(this.url+'Order/GetOrder').subscribe(
        result => {
          debugger;
          localStorage.setItem('idOrder',result['id']);
          navigator.geolocation.getCurrentPosition((resp) => {
            let mylocation = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
            this.directionsService.route({
              origin: mylocation,
              destination: result['locacion'],
              travelMode: 'DRIVING'
            }, (response, status) => {
              if (status === 'OK') {
                this.directionsDisplay.setDirections(response);
              } else {
                window.alert('Directions request failed due to ' + status);
              }
            });
          });
        },
        error => {
            console.log(<any>error);
        }
      );
  }

  calculateAndDisplayRoute() {
    if(this.name != "PICKUP"){
      this.name = "PICKUP";
      this.http.get(this.url+'Order/GetOrder').subscribe(
        result => {
          debugger;
          localStorage.setItem('idOrder',result['id']);
          navigator.geolocation.getCurrentPosition((resp) => {
            let mylocation = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
            this.directionsService.route({
              origin: mylocation,
              destination: result['locacion'],
              travelMode: 'DRIVING'
            }, (response, status) => {
              if (status === 'OK') {
                this.directionsDisplay.setDirections(response);
              } else {
                window.alert('Directions request failed due to ' + status);
              }
            });
          });
        },
        error => {
            console.log(<any>error);
        }
      );
    }else{
      this.name = "PAY PICKUP";
      let id = +(localStorage.getItem('idOrder'));
      debugger;
      this.http.post(this.url+'Order/Update',id).subscribe(
        result => {
            debugger;
            
        },
        error => {
            console.log(<any>error);
        }
      );
    }
  }

}