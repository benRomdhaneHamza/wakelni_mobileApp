import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
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
		private alertCtrl: AlertController,
		private loadingCtrl: LoadingController,
		private storage: Storage) {
			this.storage.get('user').then((_currentUser) => {
				if (_currentUser) return this.nav.setRoot('HomePage');
			});
		}

  public createAccount() {
    this.nav.push('RegisterPage');
  }

  public login() {
		this.showLoading();
		this.auth.login(this.loginCredentials).then(_res => {
			this.nav.setRoot('HomePage');
		}).catch(_err => {
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
		});
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
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
}
