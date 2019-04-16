import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurrentCommandDetailsPage } from './current-command-details';

@NgModule({
  declarations: [
    CurrentCommandDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(CurrentCommandDetailsPage),
  ],
})
export class CurrentCommandDetailsPageModule {}
