import { Component, Input  } from '@angular/core';
import { CommandProvider } from "../../providers/command/command";
import { SpacesProvider } from "../../providers/spaces/spaces";
import { NavController } from 'ionic-angular';

@Component({
	selector: 'space-item',
	templateUrl: 'space-item.html'
})
export class SpaceItemComponent {
	// PROPS
	@Input() space: any;
	@Input() parentComponent: String;

	constructor(private nav: NavController,
		private commandProvider: CommandProvider,
		private spaceProvider: SpacesProvider) {

	}

	ionViewWillEnter() {
	}

	OpenSpace() {
		// lets open home-page wich is meals page 
		this.nav.push('HomePage' , { 'space': this.space });
		// this.nav.push('HomePage' , { 'space': this.space });
	}
}
