import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthService } from "../../providers/auth-service/auth-service";
import { UsersProvider } from "../../providers/users/users"
import { AddressesProvider } from "../../providers/addresse/addresses"

@IonicPage()
@Component({
	selector: 'page-account',
	templateUrl: 'account.html',
})
export class AccountPage {

	adressesScrollHeight: 0;
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
		private userProvider: UsersProvider,
		private addressesProvider: AddressesProvider) {

	}

	logout() {
		this.authService.logout();
		this.navCtrl.setRoot('LoginPage');
		window.location.reload();
	}

	formatAddress(_address) {
		return _address.map(a => a.city);
	}

	ionViewWillEnter() {
		this.storage.get('user').then((_currentUser) => {
			this.currentUser = _currentUser.user;
			this.userInfo = this.currentUser;
		})
	}

	disableUpdateGeneralBtn() {
		if (this.userInfo.firstname && this.userInfo.firstname.trim() != '' &&
			this.userInfo.lastname && this.userInfo.lastname.trim() != '' &&
			this.userInfo.phone && this.userInfo.phone.trim() != '') return true;
		return false;
	}
	async updateGeneralInfo() {
		let data = {
			firstname: this.userInfo.firstname,
			lastname: this.userInfo.lastname,
			phone: this.userInfo.phone
		}
		this.userProvider.updateUser(data).then(_res => {
			this.storage.get('user').then((_currentUser) => {
				this.currentUser = _currentUser.user;
				this.userInfo = this.currentUser;
			}).catch(_err => {
				const alert = this.alertCtrl.create({
					title: 'Une Erreur est survenue',
					buttons: ['OK']
				});
				alert.present();
			})
		})
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
						this.updateUserEmail(data.password, data.email);
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
						this.updateUserPassword(data.actualPassword, data.newPassword);
					}
				}
			]
		});
		prompt.present();
	}
	deleteAddress(e, _addressId) {
		this.addressesProvider.deleteAddress(_addressId).then(() => {
			this.storage.get('user').then((_currentUser) => {
				this.currentUser = _currentUser.user;
				this.userInfo = this.currentUser;
			})
		}).catch(_err => {
			console.log('____deleteAddress______', _err);
			const alert = this.alertCtrl.create({
				title: 'Une Erreur est survenue',
				buttons: ['OK']
			});
			alert.present();
		})
	}
	calculAddressesScrollHeight(_addresses) {
		if (_addresses.length >= 4 ) return '200px';
		else return (50 * _addresses.length) + 'px';
	}
	updateUserEmail(_password, _newEmail) {
		this.userProvider.updateUserEmail(_password, _newEmail).then(_updated => {
			return this.logout();
		}).catch(_err => {
			console.log('_errrrr_rrr', _err);
			const alert = this.alertCtrl.create({
				title: 'verifiez vos données',
				buttons: ['OK']
			});
			alert.present();
		})
	}
	updateUserPassword(_oldPassword, _newPassword) {
		this.userProvider.updateUserPassword(_oldPassword, _newPassword).then(_updated => {
			return this.logout();
		}).catch(_err => {
			console.log('_errrrr_rrr', _err);
			const alert = this.alertCtrl.create({
				title: 'verifiez vos données',
				buttons: ['OK']
			});
			alert.present();
		})
	}
}
