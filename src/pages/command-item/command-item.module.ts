import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommandItemPage } from './command-item';
import { MealItemComponent } from "../../components/meal-item/meal-item";

@NgModule({
  declarations: [
		CommandItemPage,
		MealItemComponent
  ],
  imports: [
    IonicPageModule.forChild(CommandItemPage),
  ],
})
export class CommandItemPageModule {}
