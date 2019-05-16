import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV } from '../../environments/environment';
import { Storage } from '@ionic/storage';

@Injectable()
export class CommandProvider {

	apiUrl = ENV.BASE_URL + '/commands';
	currentUser = null;

	currentCommand = [];

	constructor(public http: HttpClient,
		private storage: Storage) {
		this.storage.get('currentCommand').then((_currentCommands) => {
			_currentCommands && _currentCommands.length ? this.currentCommand = _currentCommands : this.currentCommand = [];
		});
		this.storage.get('user').then((_currentUser) => {
			this.currentUser = _currentUser.token ? _currentUser : null;
		});
	}

	addMealToCommand(_meal) {
		return new Promise(async (resolve, reject) => {
			const validMeal = await this.verifySpace(_meal.space);
			if (!validMeal) return reject();
			this.currentCommand.push(_meal);
			this.storage.set('currentCommand', this.currentCommand);
			return resolve(true)
		});
	}
	
	removeMealFromCommand(_meal) {
		return new Promise((resolve, reject) => {
			const index = this.currentCommand.findIndex(element => element._id === _meal._id);
			this.currentCommand.splice(index, 1);
			this.storage.set('currentCommand', this.currentCommand);
			return resolve(true)
		});
	}
	calculCommandPrice(_mealList) {
		let total = 0;
		_mealList.forEach(element => {
			total += Number(element.price);
		});
		return total;
	};
	passCommand(_space, _meals, _description,_address) {
		const data = {
			space: _space,
			meals: _meals,
			description: _description,
			address: _address
		}
		return new Promise((resolve, reject) => {
			const headers = {
				'Content-Type': 'application/json',
				'x-access-token': this.currentUser.token
			}
			this.http.post(this.apiUrl, data,
				{ headers: headers }).subscribe(_command => {
					this.clearCurrentCommand();
					return resolve(_command);
				}, _err => {
					return reject(_err);
				})
		});
	}
	clearCurrentCommand() {
		this.currentCommand = []
		this.storage.remove('currentCommand');
	}

async	getUserCommands() {
		const currentUser = await this.storage.get('user')
		const headers = {
			'Content-Type': 'application/json',
			'x-access-token': currentUser.token
		}
		return new Promise((resolve, reject) => {
			this.http.get(this.apiUrl+'/user', { headers: headers })
			.subscribe(_commands => {
				return resolve(_commands);
			}, _err => {
				return reject(_err);
			})
		})
	}

	verifySpace(_mealSpaceId) {
		return new Promise((resolve, reject) => {
			this.storage.get('currentCommand').then(_meals => {
				if (!_meals) return resolve(true);
				if (!_meals.length) return resolve(true);
				if (_meals[0].space != _mealSpaceId) return resolve(null);
				return resolve(true);
			}).catch(reject);
		});
	}

}
