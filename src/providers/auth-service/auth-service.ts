import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Storage } from '@ionic/storage';

import { environment as ENV } from '../../environments/environment';

@Injectable()
export class AuthService {
	apiUrl = ENV.BASE_URL+'/users';
	constructor(public http: HttpClient,
		private storage: Storage) {}

	public login(_credentials) {
		const data = {
			email: _credentials.email,
			password: _credentials.password
		}
		return new Promise((resolve, reject) => {
			this.http.post(this.apiUrl+'/login', data,
				{ headers:{ 'Content-Type': 'application/json'} }).subscribe(async _data => {
				await this.storage.set('user', _data);
				return resolve(_data);
			}, _err => {
				return reject(_err);
			})
		});
	}

	public register(_credentials) {
		const data = {
			email: _credentials.email,
			password: _credentials.password,
			firstname: _credentials.firstname,
			lastname: _credentials.lastname,
			address: _credentials.address,
		}
		return new Promise((resolve, reject) => {
			this.http.post(this.apiUrl+'/signup', data,
				{ headers:{ 'Content-Type': 'application/json'} }).subscribe(_data => {
				return resolve(_data);
			}, _err => {
				return reject(_err);
			})
		});
	}

	public logout() {
		this.storage.clear();
	}
}
