import { Component } from '@angular/core';
import { NavController, IonicPage ,NavParams, Events } from 'ionic-angular';
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
		private navParams: NavParams) {
		this.storage.get('user').then((_currentUser) => {
			if (!_currentUser) return this.nav.setRoot('LoginPage');
			this.space = this.navParams.get('space');
			
			console.log('space', this.space);
			this.currentUser = _currentUser;
			this.loadMeals = true;
		});		
	}

	getMeals() {
		this.mealsProvider.getMealsBySpace("5c97663c7e51e61fa87f7de7").then(_meals => {
			this.meals = _meals;
		}).catch(_err => console.error(_err));
	}

	ionViewWillEnter() {
//		if (this.loadMeals) 
		this.getMeals();

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
		this.nav.push('CurrentCommandPage');
	}
}
