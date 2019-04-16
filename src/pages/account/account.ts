import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthService } from "../../providers/auth-service/auth-service";

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

	constructor(public navCtrl: NavController, public navParams: NavParams,
		private storage: Storage,
		private authService: AuthService) {
  }
	
	logout() {
		this.authService.logout();
		this.navCtrl.setRoot('LoginPage');
		window.location.reload();
	}

}
