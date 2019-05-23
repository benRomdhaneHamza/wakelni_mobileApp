import { Component } from '@angular/core';
import { NavController, IonicPage, Platform, AlertController } from 'ionic-angular';
import { SpacesProvider } from '../../providers/spaces/spaces';
import { Storage } from '@ionic/storage';
import { Diagnostic } from '@ionic-native/diagnostic';

@IonicPage()
@Component({
	selector: 'spaces-page',
	templateUrl: 'spaces.html'
})
export class SpacesPage {
	spaces: any;
	currentUser: any = null;
	loadSpaces = false;
	constructor(private storage: Storage,
		public alertCtrl: AlertController,
		public platform: Platform,
		private diagnostic: Diagnostic,
		private spaceProvider: SpacesProvider,
		private nav: NavController, ) {
		this.storage.get('user').then((_currentUser) => {
			if (!_currentUser) return this.nav.setRoot('LoginPage');
			this.currentUser = _currentUser;
			this.getSpaces();
			this.loadSpaces = true;
		});
	}

	getSpaces() {
		this.spaceProvider.getSpaces().then(_spaces => {
			this.spaces = _spaces;
		}).catch(_err => console.error(_err));
	}

	ionViewWillEnter() {
		if (this.loadSpaces) this.getSpaces();
	}

	showGpsAlert() {
		const alert = this.alertCtrl.create({
			title: 'Activez votre gps',
			subTitle: 'Veuillez activer votre gps pour valider votre commande',
			buttons: ['OK']
		});
		alert.present();
	}
}
