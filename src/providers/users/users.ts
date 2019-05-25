import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment as ENV } from '../../environments/environment';

/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersProvider {
	apiUrl = ENV.BASE_URL + '/users';
	currentUser = null;

	constructor(public http: HttpClient,
		private storage: Storage) {
		this.storage.get('user').then((_currentUser) => {
			if (_currentUser)
				this.currentUser = _currentUser.token ? _currentUser : null;
		});
	}

	async updateUser(_newData) {
		const currentUser = await this.storage.get('user');
		return new Promise((resolve, reject) => {
			const headers = {
				'Content-Type': 'application/json',
				'x-access-token': currentUser.token
			}
			this.http.put(this.apiUrl, _newData, { headers: headers })
				.subscribe(async _updatedUser => {
					console.log('_updatedUser', _updatedUser);
					await this.updateUserInStore(_updatedUser);
					return resolve(true);
				}, _err => {
					return reject(_err);
				})
		});
	}

	async updateUserEmail(_password, _newEmail) {
		const currentUser = await this.storage.get('user');
		return new Promise((resolve, reject) => {
			const headers = {
				'Content-Type': 'application/json',
				'x-access-token': currentUser.token
			}
			this.http.put(this.apiUrl + '/email',
				{ password: _password, newEmail: _newEmail },
				{ headers: headers })
				.subscribe(_updatedEmail => {
					console.log('_updatedEmail', _updatedEmail);
					console.log('_updatedUser', _updatedEmail);
					return resolve(true);
				}, _err => {
					return reject(_err);
				})
		});
	}
	async updateUserPassword(_oldPassword, _newPassword) {
		const currentUser = await this.storage.get('user');
		return new Promise((resolve, reject) => {
			const headers = {
				'Content-Type': 'application/json',
				'x-access-token': currentUser.token
			}
			this.http.put(this.apiUrl + '/password',
				{ oldPassword: _oldPassword, newPassword: _newPassword },
				{ headers: headers })
				.subscribe(_updatedPassword => {
					console.log('_updatedEmail', _updatedPassword);
					return resolve(true);
				}, _err => {
					return reject(_err);
				})
		});
	}

	updateUserInStore(_user) {
		return new Promise(async (resolve, reject) => {
			let currentUser = await this.storage.get('user');
			currentUser.user = _user;
			await this.storage.set('user', currentUser);
			return resolve(true);
		})
	}
}
