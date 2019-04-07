import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { MealsProvider } from "../../providers/meals/meals";

@IonicPage()
@Component({
  selector: 'page-command-item',
  templateUrl: 'command-item.html',
})
export class CommandItemPage {

	command = []

	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		private viewController: ViewController,
		private mealsProvider: MealsProvider,
		params: NavParams) {
			this.command = params.get('command');
			this.command = this.getUnique(this.command, '_id')
			this.command.forEach(_meal => {
				this.mealsProvider.calculRecurrenceOfMeal(_meal._id).then(res => {
					_meal.count = res;
				})
			})
  }

	dismiss() {
    this.viewController.dismiss();
	}
	
	getUnique(arr, comp) {
		const unique = arr
			.map(e => e[comp])
			// store the keys of the unique objects
			.map((e, i, final) => final.indexOf(e) === i && i)
			// eliminate the dead keys & store unique objects
			.filter(e => arr[e]).map(e => arr[e]);
		return unique;
	}
	

}
