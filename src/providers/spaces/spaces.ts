import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment as ENV } from '../../environments/environment';

@Injectable()
export class SpacesProvider {

	apiUrl = ENV.BASE_URL + '/spaces';
	currentUser = null;

	constructor(public http: HttpClient,
		private storage: Storage) {
		this.storage.get('user').then((_currentUser) => {
			if ( _currentUser)
			this.currentUser = _currentUser.token ? _currentUser : null;
		});
	}

	async getSpaces() {
		const currentUser = await this.storage.get('user');
		return new Promise((resolve, reject) => {
			const headers = {
				'Content-Type': 'application/json',
				'x-access-token': currentUser.token
			}
			this.http.get(this.apiUrl,
				{ headers: headers }).subscribe(_spaces => {
					return resolve(_spaces);
				}, _err => {
					return reject(_err);
				})
		});
	}

	async getSpace(_id) {
		const currentUser = await this.storage.get('user');
		return new Promise((resolve, reject) => {
			const headers = {
				'Content-Type': 'application/json',
				'x-access-token': currentUser.token
			}
			this.http.get(this.apiUrl + '/' + _id,
				{ headers: headers }).subscribe(_space => {
					return resolve(_space);
				}, _err => {
					return reject(_err);
				})
		});
	}

	convertObjToArray(_obj) {
		return Object.keys(_obj).map(function (personNamedIndex) {
			let person = _obj[personNamedIndex];
			return person;
		});
	}
	

}
