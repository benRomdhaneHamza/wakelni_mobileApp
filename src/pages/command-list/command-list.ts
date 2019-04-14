import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Slides, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MealsProvider } from "../../providers/meals/meals";
import { CommandProvider } from "../../providers/command/command";

@IonicPage()
@Component({
	selector: 'page-command-list',
	templateUrl: 'command-list.html',
})
export class CommandListPage {

	@ViewChild(Slides) slides: Slides;

	currentCommand = [];
	currentCommandPrice = null;
	commandsHistory = null;

	segmentChoice = 'currentCommandChoice'

	constructor(public navCtrl: NavController,
		public events: Events,
		public navParams: NavParams,
		private storage: Storage,
		private modalController: ModalController,
		private mealsProvider: MealsProvider,
		private commandProvider: CommandProvider
		) {		
	}

	ionViewWillEnter() {
		this.events.subscribe('updatedCommand', (data) => {
			this.storage.get('currentCommand').then(async (_currentCommand) => {
				if (!_currentCommand || !_currentCommand.length) return null;
				this.currentCommandPrice = await this.commandProvider.calculCommandPrice(_currentCommand);
			});
		});

		this.currentCommand = [];
		this.storage.get('currentCommand').then(async (_currentCommand) => {
			if (!_currentCommand || !_currentCommand.length) return null;
			// calcul total price of command
			this.currentCommandPrice = await this.commandProvider.calculCommandPrice(_currentCommand);
			this.currentCommand = this.getUnique(_currentCommand, '_id');
			this.currentCommand.forEach(async _meal => {
				_meal.count = await this.mealsProvider.calculRecurrenceOfMeal(_meal._id);
			});
		});

		// LOAD HISTORY
		this.commandProvider.getUserCommands().then(_commands => {
			this.commandsHistory = _commands;
		})
	}

	ionViewWillLeave() {
		this.events.unsubscribe('updatedCommand');
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

	async openModal() {
		let command = null;
		command = await this.storage.get('currentCommand');
		const data = {
			commandLength: command.length,
			mealsPrice: this.currentCommandPrice,
			duration: 30,
			space: 'restaurant X'
		}
		this.modalController.create('CurrentCommandDetailsPage', { 'data': data }, { cssClass: 'inset-modal' })
			.present();
	}

	formatDate(_date) {
		const date =  new Date(_date);
		return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
	}

	filterCommands(_array, _value) {
		return _array.filter(x => x.state == _value);
	}


}
