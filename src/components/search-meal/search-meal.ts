import { Component } from '@angular/core';

/**
 * Generated class for the SearchMealComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'search-meal',
  templateUrl: 'search-meal.html'
})
export class SearchMealComponent {

  text: string;

  constructor() {
    console.log('Hello SearchMealComponent Component');
    this.text = 'Hello World';
  }

}
