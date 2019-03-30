import { NgModule } from '@angular/core';
import { SearchMealComponent } from './search-meal/search-meal';
import { MealItemComponent } from './meal-item/meal-item';
@NgModule({
	declarations: [SearchMealComponent,
    MealItemComponent],
	imports: [],
	exports: [SearchMealComponent,
    MealItemComponent]
})
export class ComponentsModule {}
