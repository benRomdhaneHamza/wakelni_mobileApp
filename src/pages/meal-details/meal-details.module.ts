import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MealDetailsPage } from './meal-details';

@NgModule({
  declarations: [
    MealDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MealDetailsPage),
  ],
})
export class MealDetailsPageModule {}
