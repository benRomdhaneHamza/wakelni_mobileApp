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
			if ( _currentUser)
			this.currentUser = _currentUser.token ? _currentUser : null;
		});
  }
  
  async updateUser() {
		const currentUser = await this.storage.get('user');
		console.log(currentUser)
		return new Promise((resolve, reject) => {
			const headers = {
				'Content-Type': 'application/json',
				'x-access-token': currentUser.token
			}
			return new Promise((resolve, reject) => {
				this.http.put(this.apiUrl +"/"+ currentUser.user._id,
					currentUser.user,
					{ headers: headers }).subscribe(async _user => {
						await this.storage.set('user', _user);
						return resolve(_user);
					}, _err => {
						return reject(_err);
					})
				})
			});
	}
}
