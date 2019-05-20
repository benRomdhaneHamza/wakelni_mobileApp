import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthService } from "../../providers/auth-service/auth-service";
import { UsersProvider } from "../../providers/users/users"

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

	currentUser : any;
	userInfo = {
		firstname : '',
		lastname:'',
		email :'',
		address:[],
		// address can be changed to model where it contains langitude and lattitude
	}
	constructor(public navCtrl: NavController, public navParams: NavParams,
		private storage: Storage,
		private authService: AuthService,
		private userProvider: UsersProvider) {
			
  	}
	
	logout() {
		this.authService.logout();
		this.navCtrl.setRoot('LoginPage');
		window.location.reload();
	}
	async saveModiciation() {
		this.currentUser.user.address = this.userInfo.address
		this.currentUser.user.firstname = this.userInfo.firstname
		this.currentUser.user.lastname = this.userInfo.lastname
		this.currentUser.user.address = this.userInfo.address
		this.currentUser.user.email = this.userInfo.email
		let user = await this.userProvider.updateUser();
	}

	formatAddress(_address) {
		return _address.map(a => a.city);
	}
			
	ionViewWillEnter() {
		this.storage.get('user').then((_currentUser) => {
			this.currentUser = _currentUser.user;
			this.userInfo = this.currentUser;
			console.log('this.userInfo', this.userInfo);
		})
	}
}
