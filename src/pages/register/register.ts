import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
	selector: 'page-register',
	templateUrl: 'register.html',
})
export class RegisterPage {

	loading: Loading;
	registerCredentials = {
		lastname: null,
		firstname: null,
		email: null,
		password: null,
		phone: null
	};

	constructor(private nav: NavController,
		private auth: AuthService,
		private alertCtrl: AlertController,
		private loadingCtrl: LoadingController) { }

	public register() {
		this.showLoading();
		this.auth.register(this.registerCredentials).then(_res => {
			this.nav.setRoot('HomePage');
		}).catch(_err => {
			this.loading.dismiss();
			this.alertCtrl.create({
				message: 'Veuillez verifier vos données',
				buttons: ['OK']
			}).present();
		});
	}

	showLoading() {
		this.loading = this.loadingCtrl.create({
			content: 'Please wait...',
			dismissOnPageChange: true
		});
		this.loading.present();
	}

}
