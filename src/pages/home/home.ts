import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	constructor(private storage: Storage,
		private nav: NavController,) {
		this.storage.get('user').then((_currentUser) => {
			console.log('_currentUser', _currentUser);
			if (!_currentUser) this.nav.setRoot('LoginPage');
		});
	}
}
