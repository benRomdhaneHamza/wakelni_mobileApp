import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { SpacesProvider } from '../../providers/spaces/spaces';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
	selector: 'spaces-page',
	templateUrl: 'spaces.html'
})
export class SpacesPage {
	spaces: any ;
	currentUser: any = null;
	loadSpaces = false;
	constructor(private storage: Storage,
		private spaceProvider : SpacesProvider,
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
			console.log('*-*-*-*-*-', this.spaces);
		}).catch(_err => console.error(_err));
	}

	ionViewWillEnter() {
		if (this.loadSpaces) this.getSpaces();
	}
}
