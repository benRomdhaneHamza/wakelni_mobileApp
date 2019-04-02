import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the CommandItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-command-item',
  templateUrl: 'command-item.html',
})
export class CommandItemPage {

	command = []

	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		private viewController: ViewController,
		params: NavParams) {
			console.log('params', params.get('command'));
			this.command = params.get('command');
  }

	dismiss() {
    this.viewController.dismiss();
  }

}
