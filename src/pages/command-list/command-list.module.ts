import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { CommandListPage } from './command-list';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
	declarations: [
		CommandListPage,
	],
	imports: [
		// IonicModule.forRoot(CommandListPage, {
		// 	mode: 'ios'
		// }),
		IonicPageModule.forChild(CommandListPage),
		ComponentsModule
	],
})
export class CommandListPageModule { }
