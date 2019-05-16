import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment as ENV } from '../../environments/environment';

@Injectable()
export class MealsProvider {

	apiUrl = ENV.BASE_URL + '/meals';
	currentUser = null;

	constructor(public http: HttpClient,
		private storage: Storage) {
		this.storage.get('user').then((_currentUser) => {
			if ( _currentUser)
			this.currentUser = _currentUser.token ? _currentUser : null;
		});
	}

	getMeals() {
		return new Promise((resolve, reject) => {
			const headers = {
				'Content-Type': 'application/json',
				'x-access-token': this.currentUser.token
			}
			this.http.get(this.apiUrl,
				{ headers: headers }).subscribe(_meals => {
					const meals = this.convertObjToArray(_meals);
					meals.forEach(async element => {
						element.count = await this.calculRecurrenceOfMeal(element._id)
					});
					return resolve(_meals);
				}, _err => {
					return reject(_err);
				})
		});
	}

	getMealsBySpace(spaceId) {
		return new Promise((resolve, reject) => {
			const headers = {
				'Content-Type': 'application/json',
				'x-access-token': this.currentUser.token
			}
			this.http.get(this.apiUrl + '/space/' + spaceId,
				{ headers: headers }).subscribe(_meals => {
					const meals = this.convertObjToArray(_meals);
					meals.forEach(async element => {
						element.count = await this.calculRecurrenceOfMeal(element._id);						
					});
					return resolve(_meals);
				}, _err => {
					return reject(_err);
				})
		});
	}

	getMeal(_id) {
		return new Promise((resolve, reject) => {
			const headers = {
				'Content-Type': 'application/json',
				'x-access-token': this.currentUser.token
			}
			this.http.get(this.apiUrl + '/' + _id,
				{ headers: headers }).subscribe(_meal => {
					return resolve(_meal);
				}, _err => {
					return reject(_err);
				})
		});
	}

	calculRecurrenceOfMeal(_mealId) {
		return new Promise((resolve, reject) => {
			this.storage.get('currentCommand').then((_currentCommand) => {
				if (!_currentCommand) return resolve(0);
				let num = 0;
				_currentCommand.forEach(element => {
					if (element._id == _mealId) num++;
				});
				return resolve(num);
			});
		});
	}

	convertObjToArray(_obj) {
		return Object.keys(_obj).map(function (personNamedIndex) {
			let person = _obj[personNamedIndex];
			return person;
		});
	}

}
