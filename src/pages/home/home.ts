import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
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
	constructor(private storage: Storage,
		private mealsProvider: MealsProvider,
		private nav: NavController, ) {
		this.storage.get('user').then((_currentUser) => {
			if (!_currentUser) return this.nav.setRoot('LoginPage');
			this.currentUser = _currentUser;
			this.getMeals();
			this.loadMeals = true;
		});
	}

	getMeals() {
		this.mealsProvider.getMeals().then(_meals => {
			this.meals = _meals;
		}).catch(_err => console.error(_err));
	}

	ionViewWillEnter() {
		if (this.loadMeals) this.getMeals();
	}
}
