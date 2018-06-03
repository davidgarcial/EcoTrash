import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

export interface Order {
  FechaRecoleccion: Date;
  IdUsuarioPeticion: number;
  FechaRealRecoleccion: Date;
  Estatus: string;
  IdTipoPedido:number;
  locacion: string;
  total:any;
}

export interface OrderDetail {
  cantidadKg: number;
  total: number;
  idProducto: number;
}

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  
  public url:string = "http://ecotrash20180317101643.azurewebsites.net/";
  @ViewChild('map') mapElement: ElementRef;
  public map: any;
  public products;
  public total:number;
  public decription:string;
  public location:string;
  public kilograms:number;
  public showTotal:boolean = false;
  public selectedType:any;
  public isVisible:boolean = false;
  public mapVisible:boolean = false;
  public cols:number = 0;
  public dateRecolect:any;
  markers = [];
  componentData;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(public navCtrl: NavController, public http: HttpClient, public platform: Platform, private alertCtrl: AlertController) {
    platform.ready().then(() => {
      this.initMap();
    });

    this.http.get(this.url+'Order/GetProducts').subscribe(
      result => {
        this.products = result;
      },
      error => {
          console.log(<any>error);
      }
    );
  }

  public userSettings2: any = {
    showRecentSearch: false,
    searchIconUrl: 'http://downloadicons.net/sites/default/files/identification-search-magnifying-glass-icon-73159.png'
  };

  public autoCompleteCallback1(data: any): any {
    this.componentData = data;
    if(this.componentData.data.description){
      this.directionsService.route({
        origin: this.componentData.data.description,
        destination: this.componentData.data.description,
        travelMode: 'DRIVING'
      }, (response, status) => {
        if (status === 'OK') {
          this.directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }
  }

  
  public initMap() {
    navigator.geolocation.getCurrentPosition((resp) => {
      let mylocation = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
      var map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 18,
        navigationControl: false,
        draggable: false,
        center: mylocation
  
       });
      var marker =new google.maps.Marker({
        position:mylocation,
        navigationControl: false,
        map:map,
        title:'Location'
      });
      marker.setMap(map);
      this.map = new google.maps.Map(this.mapElement.nativeElement, map);
      this.map.navigator = false;
      this.map.navigationControl = false;
      this.location = mylocation;
      this.directionsDisplay.setMap(this.map);
    });
  }

  public calculate(){
    this.total = Math.round(this.kilograms * this.selectedType);
    this.showTotal = true;
  }

  public mapChange(){
    if(this.isVisible)
    {
      document.getElementById("map").style.height = "0%";
      document.getElementById("map").style.marginTop = "0%";
    }
    else
    {
      document.getElementById("map").style.height = "40%";
      document.getElementById("map").style.marginTop = "-10%";
    }
  }

  public agend(){
    if(this.kilograms && this.dateRecolect && this.selectedType && this.componentData.data.description){
      var idProduct = 0;
      for(let o of this.products){
        if(o['tarifa'] == this.selectedType)
          idProduct = o['id'];
    }

      let orderDetail : OrderDetail = {
        cantidadKg: this.kilograms,
        total: this.total,
        idProducto: idProduct
      };
      this.http.post(this.url+'Order/CreateDetail',orderDetail).subscribe(
        result => {
            debugger;
            console.log(result);
            let order : Order = {
              FechaRecoleccion: this.dateRecolect,
              IdUsuarioPeticion:+(localStorage.getItem('id')),
              FechaRealRecoleccion: this.dateRecolect,
              Estatus: 'P',
              IdTipoPedido:+result,
              locacion: this.componentData.data.description,
              total:this.total
            };
            
          this.http.post(this.url+'Order/Create',order).subscribe(
              result => {
                let alert = this.alertCtrl.create({
                  title: 'Done',
                  subTitle: 'The schedule is agend',
                  buttons: ['Ok']
                });
                alert.present();
                this.selectedType = null;
                this.kilograms = null;
                this.total = null;
                this.decription = null;
                this.dateRecolect = null;
              },
              error => {
                  console.log(<any>error);
              }
            );
        },
        error => {
            console.log(<any>error);
        }
      );
    }
    else{
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'The user or password as wrong',
        buttons: ['Ok']
      });
      alert.present();
    }
  }
} 