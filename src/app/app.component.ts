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
		});
	}
}

