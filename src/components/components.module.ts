import { NgModule } from '@angular/core';
import { SearchMealComponent } from './search-meal/search-meal';
import { MealItemComponent } from './meal-item/meal-item';
import { IonicModule } from "ionic-angular";

@NgModule({
	declarations: [SearchMealComponent,
    MealItemComponent],
	imports: [IonicModule],
	exports: [SearchMealComponent,
    MealItemComponent]
})
export class ComponentsModule {}
