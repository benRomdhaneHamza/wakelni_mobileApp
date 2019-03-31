import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
	selector: 'page-command-list',
	templateUrl: 'command-list.html',
})
export class CommandListPage {

	currentCommand = null

	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		private storage: Storage) {
		
	}

	ionViewWillEnter() {
		this.storage.get('currentCommand').then((_currentCommand) => {
			this.currentCommand = _currentCommand;
		});
	}

}
