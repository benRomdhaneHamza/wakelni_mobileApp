import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';

import { HereMapComponent } from '../../components/here-map/here-map';


/**
 * Generated class for the CommandValidationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-command-validation',
  templateUrl: 'command-validation.html',
})
export class CommandValidationPage {
  hideMe = false;
  private list: string[] = ['Argentina',
    'Bolivia',
    'Brazil',
    'Chile',
    'Colombia',
    'Ecuador',
    'French Guiana',
    'Guyana',
    'Paraguay',
    'Peru',
    'Suriname',
    'Uruguay',
    'Venezuela'];
  public searchText: string = '';
  public countries: string[] = [];

  lat = 48.866667 ;
  lng = 2.333333;
  message="123"
  options = {
    enableHighAccuracy: true,
    timeout: 5000,
       }
  @ViewChild(HereMapComponent) map: HereMapComponent;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, public alertCtrl: AlertController) {
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad CommandValidationPage');
    
  }
  async autoLocate(fab){
    fab.close();
    this.message = "NO"
      this.geolocation.getCurrentPosition().then((resp) => {
        this.lat = resp.coords.latitude;
        this.lng= resp.coords.longitude;
        this.message="YES 1"
        console.log(this.map);
      }, (error) => {
        this.message=error;
      }).catch((err) => {
        //alert('Error getting location' + JSON.stringify(error));
        this.message = JSON.stringify(err)
      });
    let watch = this.geolocation.watchPosition(this.options);
   let observer= watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      this.lat= data.coords.latitude
      this.lng= data.coords.longitude
      this.message="YES"
      
      this.map.setCenter(this.lat, this.lng)
      observer.unsubscribe();
    });
    
  }
  manuallyLocate(fab){
    fab.close();
    this.map.addMrkerOnClick();
  }

  
  removeFocus() {
    this.hideMe = false;
  }
  addFocus() {
    this.hideMe = true;
  }

  search() {
    if (!this.searchText.trim().length || !this.hideMe) {
      this.countries = [];
      return;
    }

    this.countries = this.list.filter(item => item.toUpperCase().includes(this.searchText.toUpperCase()));
  }
  showPrompt(fab) {
    fab.close();
    const prompt = this.alertCtrl.create({
      title: "Enregistrer l'addresse",
      message: "Donner un nom a cette adresse",
      inputs: [
        {
          name: 'description',
          placeholder: 'adresse description',
          value:this.map.defaultAddressDescription
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked'+data.description);
          }
        }
      ]
    });
    prompt.present();
  }

}
