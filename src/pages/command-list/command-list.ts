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

	currentCommand = [];
	currentCommandPrice = null;

	segmentChoice = 'currentCommandCoice'

	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		private storage: Storage,
		private modalController: ModalController,
		private mealsProvider: MealsProvider,
		private commandProvider: CommandProvider) {		
	}

	ionViewWillEnter() {
		this.currentCommand = [];
		this.storage.get('currentCommand').then((_currentCommand) => {
			if (!_currentCommand || !_currentCommand.length) return null
			this.currentCommand = this.getUnique(_currentCommand, '_id');
			this.currentCommand.forEach(async _meal => {
				_meal.count = await this.mealsProvider.calculRecurrenceOfMeal(_meal._id);
			});
		});		
	}

	getUnique(arr, comp) {
		const unique = arr
			.map(e => e[comp])
			// store the keys of the unique objects
			.map((e, i, final) => final.indexOf(e) === i && i)
			// eliminate the dead keys & store unique objects
			.filter(e => arr[e]).map(e => arr[e]);
		return unique;
	}

	validateCommand() {

	}

}
