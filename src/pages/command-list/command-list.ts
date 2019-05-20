import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Slides, Events, Content, Loading, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MealsProvider } from "../../providers/meals/meals";
import { CommandProvider } from "../../providers/command/command";
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-command-list',
	templateUrl: 'command-list.html',
})
export class CommandListPage {

	@ViewChild(Slides) slides: Slides;
	@ViewChild(Content) content: Content;

	commandValidationRoot = "CommandValidationPage"

	filterVisible = false;
	currentCommand = [];
	currentCommandPrice = null;
	commandsHistory = null;
	groupedHistory = [];
	filtredList = [];
	queryText: any = "";
	segmentChoice = 'currentCommandChoice';
	loading: Loading;

	constructor(public navCtrl: NavController,
		public alertCtrl: AlertController,
		public events: Events,
		public navParams: NavParams,
		private storage: Storage,
		private modalController: ModalController,
		private mealsProvider: MealsProvider,
		private commandProvider: CommandProvider,
		private loadingCtrl: LoadingController,
		private geolocation: Geolocation
	) {
	}

	ionViewWillEnter() {
		this.events.subscribe('updatedCommand', (data) => {
			this.storage.get('currentCommand').then(async (_currentCommand) => {
				if (!_currentCommand || !_currentCommand.length) {
					this.currentCommandPrice = 0;
					return null;
				}
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
			//this.groupedHistory = this.commandsHistory;

			//console.log(result);
			if (this.groupedHistory.length != 0) {
				this.groupedHistory = this.groupByState(this.commandsHistory);

				this.groupedHistory[0].open = true;
				this.filtredList = this.groupedHistory;
				console.log(this.groupedHistory);
			}



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
	OpenCommandValidation() {
		this.geolocation.getCurrentPosition().then(_pos => {
			if (_pos) return this.navCtrl.push('CommandValidationPage');
		}).catch(_err => {
			this.showGpsAlert();
		});
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
		const date = new Date(_date);
		return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
	}

	filterCommands(_array, _value) {
		return _array.filter(x => x.state == _value);
	}
	toggleHistoryGroup(i) {
		this.filtredList[i].open = !this.filtredList[i].open;
	}
	groupByState(listToGroup) {
		var list = [];
		listToGroup.forEach(function (hash) {
			return function (a) {
				if (!hash[a.state]) {
					hash[a.state] = { state: a.state, commands: [] };
					list.push(hash[a.state]);
				}
				hash[a.state].commands.push({
					description: a.description,
					mealList: a.mealList,
					price: a.price,
					user: a.user,
					space: a.space,
					createdAt: a.createdAt
				});
			};
		}(Object.create(null)));

		return list;
	}
	filterListCommand() {
		this.groupedHistory = this.commandsHistory;
		this.groupedHistory = this.groupedHistory.filter(item => {
			return (item.state.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1) ||
				(item.description.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1) ||
				(item.space.name.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1) ||
				(item.space.description.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1) ||
				(item.space.city.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1);
		});
		this.filtredList = this.groupByState(this.groupedHistory);

	}
	showFilter() {
		this.filterVisible = !this.filterVisible;
	}
	segmentClick() {
		this.content.resize();
	}

	showLoading() {
		this.loading = this.loadingCtrl.create({
			content: 'Envoi de la commande ...',
			dismissOnPageChange: true
		});
		this.loading.present();
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

