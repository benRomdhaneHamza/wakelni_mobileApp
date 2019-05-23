import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthService } from "../../providers/auth-service/auth-service";
import { UsersProvider } from "../../providers/users/users"

@IonicPage()
@Component({
	selector: 'page-account',
	templateUrl: 'account.html',
})
export class AccountPage {

	currentUser: any;
	userInfo = {
		firstname: '',
		lastname: '',
		email: '',
		address: [],
		phone: ''
		// address can be changed to model where it contains langitude and lattitude
	}
	constructor(public navCtrl: NavController, public navParams: NavParams,
		private storage: Storage,
		public alertCtrl: AlertController,
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

	disableUpdateGeneralBtn() {
		if (this.userInfo.firstname && this.userInfo.firstname.trim() != '' &&
			this.userInfo.lastname && this.userInfo.lastname.trim() != '' &&
			this.userInfo.phone && this.userInfo.phone.trim() != '') return true;
		return false;
	}
	updateGeneralInfo() {

	}

	changeEmailAlert(e) {
		const prompt = this.alertCtrl.create({
			title: 'Vous allez changer votre adresse mail',
			message: "Indiquez votre mot de passe actuel et votre nouvelle adresse pour valider vos changement",
			inputs: [
				{
					name: 'password',
					placeholder: 'mot de passe',
					type: 'password'
				},
				{
					name: 'email',
					placeholder: 'nouvelle adresse mail',
					type: 'email'
				},
			],
			buttons: [
				{
					text: 'Annuler',
					handler: data => {
						console.log('Cancel clicked');
					}
				},
				{
					text: 'Valider',
					handler: data => {
						console.log('Saved clicked', data);
					}
				}
			]
		});
		prompt.present();
	}
	changePasswordAlert(e) {
		const prompt = this.alertCtrl.create({
			title: 'Vous allez changer votre mot de passe',
			message: "Indiquez votre mot de passe actuel et votre nouveau mot de passe pour valider vos changement",
			inputs: [
				{
					name: 'actualPassword',
					placeholder: 'mot de passe acteul',
					type: 'password'
				},
				{
					name: 'newPassword',
					placeholder: 'nouveau mot de passe',
					type: 'password'
				},
			],
			buttons: [
				{
					text: 'Annuler',
					handler: data => {
						console.log('Cancel clicked');
					}
				},
				{
					text: 'Valider',
					handler: data => {
						console.log('Saved clicked', data);
					}
				}
			]
		});
		prompt.present();
	}
}
