import { Component, Input  } from '@angular/core';
import { CommandProvider } from "../../providers/command/command";

@Component({
	selector: 'meal-item',
	templateUrl: 'meal-item.html'
})
export class MealItemComponent {
	// PROPS
	@Input() hero: string;
	@Input() master: string;
	@Input() meal: any;

	commands = 0;
	constructor(private commandProvider: CommandProvider) {
	}

	ngOnInit(): void {
	}

	addToCommands() {
		this.commandProvider.addMealToCommand(this.meal._id);
		this.commands ++;
	}

	removeFromCommands() {
		this.commandProvider.removeMealFromCommand(this.meal._id);
		this.commands <= 0 ? this.commands = 0 : this.commands --;
	}
}
