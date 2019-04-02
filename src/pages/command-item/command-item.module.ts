import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommandItemPage } from './command-item';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
		CommandItemPage
  ],
  imports: [
		IonicPageModule.forChild(CommandItemPage),
		ComponentsModule
  ],
})
export class CommandItemPageModule {}
