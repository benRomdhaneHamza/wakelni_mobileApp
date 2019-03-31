import { Component, Input  } from '@angular/core';

/**
 * Generated class for the MealItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
	selector: 'meal-item',
	templateUrl: 'meal-item.html'
})
export class MealItemComponent {
	// PROPS
	@Input() hero: string;
	@Input() master: string;
	@Input() meal: any;

	mealImage = 'https://res.cloudinary.com/du7wjgy2h/image/upload/v1553383267/meals/xtsg6yi3teh9ihoae4xx.jpg'
	constructor() {
	}

	ngOnInit(): void {
	}
}
