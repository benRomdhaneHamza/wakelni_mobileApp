import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController, ModalController } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import { AddressesProvider } from "../../providers/addresse/addresses";
import { CommandProvider } from "../../providers/command/command";
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
  currentCommand = [];
  currentCommandPrice = null;
  description: String = "";
  mapHeight = '100%';
  hideMe = false;
  currentUser: any;
  private list:[any] ;
  public searchText: string = '';
  public countries: string[] = [];
  public currentAddress= null;
  lat = 48.866667 ;
  lng = 2.333333;
  message="123"
  options = {
    enableHighAccuracy: true,
    timeout: 5000,
       }
  @ViewChild(HereMapComponent) map: HereMapComponent;
  
  constructor(private storage: Storage,
     public navCtrl: NavController, 
     public navParams: NavParams, 
     private geolocation: Geolocation,
      public alertCtrl: AlertController, 
      public commandProvider: CommandProvider,
      public adressesProvider: AddressesProvider,
    private modalController: ModalController,) {
  }

  ionViewWillEnter() {
      this.storage.get('currentCommand').then(async (_currentCommand) => {
        if (!_currentCommand || !_currentCommand.length) return this.navCtrl.pop();
        this.currentCommandPrice = this.commandProvider.calculCommandPrice(_currentCommand);
      });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommandValidationPage');
    this.initUser();
    
  }
  initUser(){
    this.storage.get('user').then((_currentUser) => {
      this.currentUser = _currentUser
       this.list = this.currentUser.address.address;
    })
  }
  async autoLocate(fab){
    fab.close();
    this.message = "NO"
      this.geolocation.getCurrentPosition().then((resp) => {
        this.lat = resp.coords.latitude;
        this.lng= resp.coords.longitude;
        this.message="YES 1"
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
      this.map.setMarkerCenter(this.lat, this.lng)
      observer.unsubscribe();
    });
    
  }
  manuallyLocate(fab){
    fab.close();
    this.map.addMrkerOnClick();
  }
  selectAddress(_address){
    console.log(_address);
    this.currentAddress = _address;
    this.map.setMarkerCenter(_address.lat,_address.lng);
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
    this.countries = this.list.filter(item => {
      return (item.city.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1) ||
        (item.description.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1) ;
    });
      //item.description.toUpperCase().includes(this.searchText.toUpperCase()));
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
            this.adressesProvider.addUserAddress(data.description,this.map.lat,this.map.lng,"paris").then(user =>{
              console.log(user);
              this.mapHeight = '50%';
            });
            console.log('Saved clicked'+data.description);
          }
        }
      ]
    });
    prompt.present();
  }
  async openModal() {
    let command = null;
    command = await this.storage.get('currentCommand');
    const data = {
      commandLength: command.length,
      mealsPrice: this.currentCommandPrice,
      duration: 30,
      space: 'restaurant X',
      description: this.description,
      address: this.currentAddress
    }
    this.modalController.create('CurrentCommandDetailsPage', { 'data': data }, { cssClass: 'inset-modal' })
      .present();
  }

}
