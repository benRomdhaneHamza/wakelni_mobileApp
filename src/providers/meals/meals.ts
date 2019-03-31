import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class MealsProvider {

	apiUrl = 'http://localhost:8080/api/meals';
	currentUser = null;

	constructor(public http: HttpClient,
		private storage: Storage) {
		this.storage.get('user').then((_currentUser) => {
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
					return resolve(_meals);
				}, _err => {
					return reject(_err);
				})
		});
	}

}
