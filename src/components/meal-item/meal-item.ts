import { Component, Input  } from '@angular/core';
import { CommandProvider } from "../../providers/command/command";
import { MealsProvider } from "../../providers/meals/meals";

@Component({
	selector: 'meal-item',
	templateUrl: 'meal-item.html'
})
export class MealItemComponent {
	// PROPS
	@Input() meal: any;
	@Input() parentComponent: String;

	constructor(private commandProvider: CommandProvider,
		private mealsProvider: MealsProvider) {
	}

	ionViewWillEnter() {
		this.meal.count = this.mealsProvider.calculRecurrenceOfMeal(this.meal._id);
	}

	addToCommands() {
		this.commandProvider.addMealToCommand(this.meal);
		this.meal.count ++;
	}

	removeFromCommands() {
		this.commandProvider.removeMealFromCommand(this.meal);
		this.meal.count <= 0 ? this.meal.count = 0 : this.meal.count --;
	}
}
