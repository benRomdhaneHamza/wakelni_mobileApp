import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { FcmProvider } from '../../providers/fcm/fcm';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {
	loading: Loading;
	loginCredentials = { email: null, password: null };

	constructor(private nav: NavController,
		private auth: AuthService,
		private fcmProvider: FcmProvider,
		private alertCtrl: AlertController,
		private loadingCtrl: LoadingController,
		private storage: Storage) {
		this.storage.get('user').then((_currentUser) => {
			if (_currentUser) return this.nav.setRoot('TabsPage');
		});
	}

	public createAccount() {
		this.nav.push('RegisterPage');
	}

	public login() {
		this.showLoading();
		this.auth.login(this.loginCredentials).then(_res => {
			this.nav.setRoot('TabsPage');
		}).catch(_err => {
			this.catchLoginError(_err);
		});
	}

	showLoading() {
		this.loading = this.loadingCtrl.create({
			content: 'Connexion en cours ...',
			dismissOnPageChange: true
		});
		this.loading.present();
	}

	showError(text) {
		this.loading.dismiss();

		let alert = this.alertCtrl.create({
			title: 'Fail',
			subTitle: text,
			buttons: ['OK']
		});
		alert.present();
	}

	catchLoginError(_err) {
		this.loading.dismiss();
			if (_err.error.wrongCredentials) {
				this.alertCtrl.create({
					message: 'Veuillez verifier vos données',
					buttons: ['OK']
				}).present();
			} else {
				this.alertCtrl.create({
					message: 'Une erreur est survenue',
					buttons: ['OK']
				}).present();
			}
	}
}
