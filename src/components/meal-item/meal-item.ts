import { Component, Input  } from '@angular/core';
import { CommandProvider } from "../../providers/command/command";
import { MealsProvider } from "../../providers/meals/meals";
import { Events , AlertController,NavController } from 'ionic-angular';

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
		public events: Events,
		private alertCtrl: AlertController) {
	}

	ionViewWillEnter() {
		this.meal.count = this.mealsProvider.calculRecurrenceOfMeal(this.meal._id);
	}

	async addToCommands() {
		this.commandProvider.addMealToCommand(this.meal).then(_res => {
			this.meal.count ++;
			this.events.publish('updatedCommand');
		}).catch(() => {
			this.alertCtrl.create({
				title: 'Autre commande en cours',
				subTitle: 'Vous avez une autre commande en cours, veuillez la finaliser pour créer une nouvelle',
				buttons: ["D'accord"]
			}).present();
		})
	}

	async removeFromCommands() {
		await this.commandProvider.removeMealFromCommand(this.meal);
		this.meal.count <= 0 ? this.meal.count = 0 : this.meal.count --;
		this.events.publish('updatedCommand');
	}

	async doSomething(){
		this.nav.push('MealDetailsPage' , { 'meal': this.meal });
	}
}
