import { Component } from '@angular/core';
import { NavController, IonicPage ,NavParams  } from 'ionic-angular';
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
	spaceId : null ; 
	constructor(private storage: Storage,
		private mealsProvider: MealsProvider,
		private nav: NavController,
		private navParams: NavParams ) {
		this.storage.get('user').then((_currentUser) => {
			if (!_currentUser) return this.nav.setRoot('LoginPage');
			this.currentUser = _currentUser;
			this.loadMeals = true;
			this.spaceId = navParams.get('_id');
		});
	}

	getMeals() {
		this.mealsProvider.getMealsBySpace(this.spaceId).then(_meals => {
			this.meals = _meals;
		}).catch(_err => console.error(_err));
	}

	ionViewWillEnter() {
		if (this.loadMeals) this.getMeals();
	}
}
