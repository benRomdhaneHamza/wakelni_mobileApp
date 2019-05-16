import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Loading, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CommandProvider } from "../../providers/command/command";

@IonicPage()
@Component({
  selector: 'page-current-command-details',
  templateUrl: 'current-command-details.html',
})
export class CurrentCommandDetailsPage {

	loading: Loading;
	commandDetails = null;
	deliveryFee = 1000;
	duration = 30

	constructor(public navCtrl: NavController, public navParams: NavParams,
		private viewController: ViewController,
		private storage: Storage,
		private commandProvider: CommandProvider,
		private loadingCtrl: LoadingController) {
			this.commandDetails = navParams.get('data');
  }
	
	dismiss() {
    this.viewController.dismiss();
	}
	
	async validateCommand() {
		this.showLoading()
		const command = await this.storage.get('currentCommand');
		const commandIds = command.map(_obj => _obj._id);
		const spaceId = command[0].space;
		await this.commandProvider.passCommand(spaceId, commandIds, this.commandDetails.description,this.commandDetails.address);
		this.commandProvider.clearCurrentCommand();
		this.navCtrl.push('TabsPage');
	}

	showLoading() {
		this.loading = this.loadingCtrl.create({
			content: 'Envoi de la commande ...',
			dismissOnPageChange: true
		});
		this.loading.present();
	}

}
