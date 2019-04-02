import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

	constructor(public navCtrl: NavController, public navParams: NavParams,
		private storage: Storage) {
  }
	
	logout() {
		this.storage.remove('user');
		this.navCtrl.setRoot('LoginPage');
		window.location.reload();
	}

}
