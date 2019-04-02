import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MealsProvider } from "../../providers/meals/meals";
import { CommandProvider } from "../../providers/command/command";

@IonicPage()
@Component({
	selector: 'page-command-list',
	templateUrl: 'command-list.html',
})
export class CommandListPage {

	currentCommandIds = null;
	currenCommandsObjects = [];
	currentCommandPrice = null;

	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		private storage: Storage,
		private modalController: ModalController,
		private mealsProvider: MealsProvider,
		private commandProvider: CommandProvider) {
		
	}

	ionViewWillEnter() {
		this.currenCommandsObjects = [];
		this.storage.get('currentCommand').then((_currentCommand) => {
			if (!_currentCommand) return null;
			this.currentCommandIds = _currentCommand;
			this.getCommandDetails(this.currentCommandIds);
		});
	}

	async getCommandDetails(_command) {
		_command.forEach(_meal => {
			this.currenCommandsObjects.push(this.mealsProvider.getMeal(_meal));
		});
		this.currenCommandsObjects = await Promise.all(this.currenCommandsObjects);
		this.currentCommandPrice = this.commandProvider.calculCommandPrice(this.currenCommandsObjects);
		console.log('-------', this.currentCommandPrice);
	}

	openCommandModal(_command = undefined) {
		this.modalController.create('CommandItemPage', { command: _command ? _command : this.currenCommandsObjects }).present();
	}

}
