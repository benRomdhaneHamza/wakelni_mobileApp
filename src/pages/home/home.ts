import { Component } from '@angular/core';
import { NavController, IonicPage ,NavParams, Events, Tabs, App } from 'ionic-angular';
import { MealsProvider } from '../../providers/meals/meals';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	meals: any;
	currentUser: any = null;
	loadMeals = false;
	space : any ;
	currentCommand: any;
	constructor(private storage: Storage,
		private mealsProvider: MealsProvider,
		public events: Events,
		private nav: NavController,
		private navParams: NavParams,
		private app: App) {
		this.storage.get('user').then((_currentUser) => {
			if (!_currentUser) return this.nav.setRoot('LoginPage');
			this.space = this.navParams.get('space');
			
			this.currentUser = _currentUser;
			this.loadMeals = true;
			this.getMeals();
		});		
	}

	getMeals() {
		this.mealsProvider.getMealsBySpace(this.space._id).then(_meals => {
			this.meals = _meals;
		}).catch(_err => console.error(_err));
	}

	ionViewWillEnter() {
		
		this.storage.get('currentCommand').then(_currentCommand => {
			this.currentCommand = _currentCommand;
		});
		this.events.subscribe('updatedCommand', (data) => {
			this.storage.get('currentCommand').then(_currentCommand => {
				this.currentCommand = _currentCommand;
			});
		});
	}

	goToCurrentCommand() {
		this.nav.parent.select(1);
	}
}
