import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Platform } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as ENV } from '../../environments/environment';
import { Storage } from '@ionic/storage';

@Injectable()
export class FcmProvider {

	apiUrl = ENV.BASE_URL + '/users';

	constructor(private platform: Platform,
		public firebaseNative: Firebase,
		public http: HttpClient,
		private storage: Storage) {
	}

	async getToken() {
		const currentUser = await this.storage.get('user');
		const headers = {
			'Content-Type': 'application/json',
			'x-access-token': currentUser.token
		}
		let token;

		if (this.platform.is('android')) {
			token = await this.firebaseNative.getToken();
		}
		if (this.platform.is('ios')) {
			token = await this.firebaseNative.getToken();
			await this.firebaseNative.grantPermission();
		}

		// Post the token to your node server
		this.http.post(this.apiUrl + '/fcmToken', { token: token }, { headers: headers })
			.subscribe(data => {
			}, error => {
				console.log("err");
				console.log(JSON.stringify(error));
			});
	}

	// Listen to incoming FCM messages
	listenToNotifications() {
		const notif = this.firebaseNative.onNotificationOpen();
		return notif;
	}

}
