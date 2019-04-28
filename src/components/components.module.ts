import { NgModule } from '@angular/core';
import { SearchMealComponent } from './search-meal/search-meal';
import { MealItemComponent } from './meal-item/meal-item';
import { SpaceItemComponent } from './space-item/space-item';
import { HereMapComponent } from './here-map/here-map';

import {IonicModule} from "ionic-angular";


@NgModule({
	declarations: [SearchMealComponent,
	MealItemComponent, 
	SpaceItemComponent,
    HereMapComponent],
	imports: [IonicModule],
	exports: [SearchMealComponent,
	MealItemComponent,
	SpaceItemComponent,
    HereMapComponent]
})
export class ComponentsModule {}
