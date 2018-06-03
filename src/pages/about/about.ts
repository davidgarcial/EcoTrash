import { Component } from '@angular/core';import { NavController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  public isConductor = false;
  public url:string = "http://ecotrash20180317101643.azurewebsites.net/";
  public photos : any;
  public photosCant : number = 0;
  public base64Image : string;

  constructor(public navCtrl: NavController, public http: HttpClient, private camera : Camera, private alertCtrl : AlertController)  {
    
  }

  beConductor() {
    var alert;
    if(localStorage.getItem('user') != 'C'){
      var id = localStorage.getItem('id');
      this.http.post(this.url+'User/BeConductor',id).subscribe(
        result => {
          alert = this.alertCtrl.create({
            title: 'Success',
            subTitle: 'You are a new conductor',
            buttons: ['Ok']
          });
          alert.present();
        },
        error => {
          alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Error been a conductor',
            buttons: ['Ok']
          });
          alert.present();
        }
      );
    }
    else
    {
      alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Fill all inputs',
        buttons: ['Ok']
      });
      alert.present();
    }
  
  }



  ngOnInit() {
    this.photos = [];
  }

  deletePhoto(index) {
    let confirm = this.alertCtrl.create({
        title: 'Sure you want to delete this photo? There is NO undo!',
        message: '',
        buttons: [
          {
            text: 'No',
            handler: () => {
              console.log('Disagree clicked');
            }
          }, {
            text: 'Yes',
            handler: () => {
              console.log('Agree clicked');
              this.photos.splice(index, 1);
            }
          }
        ]
      });
    confirm.present();
  }

  takePhoto(){
    const options : CameraOptions = {
      quality: 50, // picture quality
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options) .then((imageData) => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.photos.push(this.base64Image);
        this.photos.reverse();
        this.photosCant++;
        if(this.photosCant >= 3)
          this.isConductor = true;
      }, (err) => {
        console.log(err);
      });
  }
}
