import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { SearchMealComponent } from "../../components/search-meal/search-meal";
import { MealItemComponent } from "../../components/meal-item/meal-item";

@NgModule({
  declarations: [
		HomePage,
		SearchMealComponent,
		MealItemComponent
  ],
  imports: [
		IonicPageModule.forChild(HomePage)
  ],
  exports: [
    HomePage
  ]
})
export class HomePageModule {}