import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
	apiUrl = 'https://wakelni-api.herokuapp.com/api/users';
	constructor(public http: HttpClient) {}

	public login(_credentials) {
		const data = {
			email: _credentials.email,
			password: _credentials.password
		}
		console.log('_credentials', _credentials);
		return new Promise((resolve, reject) => {
			this.http.post(this.apiUrl+'/login', data,
				{ headers:{ 'Content-Type': 'application/json'} }).subscribe(_data => {
				return resolve(_data);
			}, _err => {
				return reject(_err);
			})
		});
	}
}
