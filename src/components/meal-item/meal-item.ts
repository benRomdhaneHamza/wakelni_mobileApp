import { Component, Input  } from '@angular/core';
import { CommandProvider } from "../../providers/command/command";
import { MealsProvider } from "../../providers/meals/meals";
import { Events , NavController } from 'ionic-angular';

@Component({
	selector: 'meal-item',
	templateUrl: 'meal-item.html'
})
export class MealItemComponent {
	// PROPS
	@Input() meal: any;
	@Input() parentComponent: String;

	constructor(private commandProvider: CommandProvider,
		private mealsProvider: MealsProvider,
		private nav: NavController,
		public events: Events) {
	}

	ionViewWillEnter() {
		this.meal.count = this.mealsProvider.calculRecurrenceOfMeal(this.meal._id);
	}

	async addToCommands() {
		await this.commandProvider.addMealToCommand(this.meal);
		this.meal.count ++;
		this.events.publish('updatedCommand');
	}

	async removeFromCommands() {
		await this.commandProvider.removeMealFromCommand(this.meal);
		this.meal.count <= 0 ? this.meal.count = 0 : this.meal.count --;
		this.events.publish('updatedCommand');
	}

	async doSomething(){
		console.log(this.meal.name + " clicked");
		this.nav.push('MealDetailsPage' , { 'meal': this.meal });
	}
}
