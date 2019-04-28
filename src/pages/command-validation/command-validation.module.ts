import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommandValidationPage } from './command-validation';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    CommandValidationPage,
  ],
  imports: [
    IonicPageModule.forChild(CommandValidationPage),
     ComponentsModule ,
  ],
})
export class CommandValidationPageModule {}
