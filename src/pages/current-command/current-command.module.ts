import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurrentCommandPage } from './current-command';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    CurrentCommandPage,
  ],
  imports: [
		IonicPageModule.forChild(CurrentCommandPage),
		ComponentsModule
  ],
})
export class CurrentCommandPageModule {}
