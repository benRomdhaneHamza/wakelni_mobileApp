import { Component } from '@angular/core';
import { Platform, ActionSheetController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FcmProvider } from '../providers/fcm/fcm';
import { ToastController } from 'ionic-angular';
import { tap } from 'rxjs/operators';
import { Firebase } from '@ionic-native/firebase';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	rootPage: any = 'TabsPage';

	constructor(platform: Platform,
		statusBar: StatusBar,
		splashScreen: SplashScreen,
		fcm: FcmProvider,
		toastCtrl: ToastController,
		public firebaseNative: Firebase,
		public actionSheetCtrl: ActionSheetController) {

		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			statusBar.styleDefault();
			splashScreen.hide();

			fcm.listenToNotifications().pipe(
				tap(msg => {
					// show an action sheet
					const actionSheet = this.actionSheetCtrl.create({
						title: msg.body,
						buttons: [
							{
								text: 'Voir la commande',
								handler: () => {
									console.log('Voir la commande clicked', msg.commandId);
								}
							},
							{
								text: 'Fermer',
								role: 'cancel',
							}
						]
					});
					actionSheet.present();
					setTimeout(() => {
						actionSheet.dismiss();
					}, 5000);
				})
			).subscribe();
		});
	}
}

