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

@NgModule({
  declarations: [
		MyApp
  ],
  imports: [
		BrowserModule,
    HttpClientModule,
    ComponentsModule,
		IonicModule.forRoot(MyApp),
		IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    AuthService,
    MealsProvider,
    SpacesProvider,
    CommandProvider
  ]
})
export class AppModule {}
