import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV } from '../../environments/environment';
import { Storage } from '@ionic/storage';

@Injectable()
export class CommandProvider {

	apiUrl = ENV.BASE_URL+'/commands';

	currentCommand = [];

	constructor(public http: HttpClient,
		private storage: Storage) {
		console.log('Hello CommandProvider Provider');
		this.storage.get('currentCommand').then((_currentCommands) => {
			_currentCommands && _currentCommands.length ? this.currentCommand = _currentCommands : this.currentCommand = [] ;
		})
	}
	
	addMealToCommand(_meal) {
		this.currentCommand.push(_meal);
		this.storage.set('currentCommand', this.currentCommand);
	}
	removeMealFromCommand(_meal) {
		this.currentCommand.splice(this.currentCommand.findIndex((_elm) => { return _elm == _meal }), 1);
		this.storage.set('currentCommand', this.currentCommand);
	}
	calculCommandPrice(_mealList) {
		let total = 0;
		_mealList.forEach(element => {
			total += Number(element.price);
		});
		return total;
	};

}
