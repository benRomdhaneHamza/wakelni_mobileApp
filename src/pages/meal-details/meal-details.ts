import { Component ,Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-meal-details',
  templateUrl: 'meal-details.html',
})
export class MealDetailsPage {

  @Input() meal: any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams) {
    this.meal = navParams.get('meal');
  }

}
