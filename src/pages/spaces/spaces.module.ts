import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpacesPage } from './spaces';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
		SpacesPage,
  ],
  imports: [
		IonicPageModule.forChild(SpacesPage),
		ComponentsModule
  ],
  exports: [
    SpacesPage,
  ]
})
export class SpacesPageModule {}