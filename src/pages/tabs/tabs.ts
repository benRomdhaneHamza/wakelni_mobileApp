import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

	tab1Root = 'SpacesPage';
	tab2Root = 'CommandListPage';
	tab3Root = 'AccountPage';

	constructor(public navCtrl: NavController, public navParams: NavParams,
		private storage: Storage) {
			this.storage.get('user').then((_currentUser) => {
				if (!_currentUser) return this.navCtrl.setRoot('LoginPage');
			});
  }

}
