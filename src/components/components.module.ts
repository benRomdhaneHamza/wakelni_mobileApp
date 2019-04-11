import { NgModule } from '@angular/core';
import { SearchMealComponent } from './search-meal/search-meal';
import { MealItemComponent } from './meal-item/meal-item';
import { SpaceItemComponent } from './space-item/space-item';

import {IonicModule} from "ionic-angular";

@NgModule({
	declarations: [SearchMealComponent,
	MealItemComponent, 
	SpaceItemComponent],
	imports: [IonicModule],
	exports: [SearchMealComponent,
	MealItemComponent,
	SpaceItemComponent]
})
export class ComponentsModule {}
