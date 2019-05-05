import { AuthService } from '../providers/auth-service/auth-service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from "@angular/common/http";
import { IonicStorageModule } from '@ionic/storage';

import { ComponentsModule } from "../components/components.module";

import { MyApp } from './app.component';
import { MealsProvider } from '../providers/meals/meals';
import { SpacesProvider } from '../providers/spaces/spaces';
import { CommandProvider } from '../providers/command/command';
import { Geolocation } from '@ionic-native/geolocation';

import { UsersProvider } from '../providers/users/users';

// *********FIREBASE STUFF *********************
import { Firebase } from '@ionic-native/firebase';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FcmProvider } from '../providers/fcm/fcm';

const config = {
	apiKey: "AIzaSyCwlbg0JdKXJFlLHIyDZaS9mS3JkQvUWpI",
	authDomain: "wakelni-bc31e.firebaseapp.com",
	databaseURL: "https://wakelni-bc31e.firebaseio.com",
	projectId: "wakelni-bc31e",
	storageBucket: "wakelni-bc31e.appspot.com",
	messagingSenderId: "839423177030"
}
// ***************************************************

@NgModule({
	declarations: [
		MyApp
	],
	imports: [
		BrowserModule,
    HttpClientModule,
    ComponentsModule,
		IonicModule.forRoot(MyApp),
		IonicStorageModule.forRoot(),

		// *********FIREBASE STUFF *********************
		AngularFireModule.initializeApp(config), 
    AngularFirestoreModule,
		// ***************************************************
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp
	],
	providers: [
		Geolocation,
		StatusBar,
		SplashScreen,
		{
			provide: ErrorHandler,
			useClass: IonicErrorHandler
		},
		AuthService,
		MealsProvider,
		SpacesProvider,
		CommandProvider,
		UsersProvider,
    FcmProvider,

		// *********FIREBASE STUFF *********************
		Firebase,
    FcmProvider
		// ***************************************************
	]
})
export class AppModule { }
