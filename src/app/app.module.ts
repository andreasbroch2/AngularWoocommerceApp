import { NgModule, LOCALE_ID} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { registerLocaleData } from '@angular/common';
import localeDa from '@angular/common/locales/da';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpRequestInterceptor } from './services/http-request-interceptor';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPencilAlt, faBoxOpen, faMinus, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

// the second parameter 'fr' is optional
registerLocaleData(localeDa, 'da');

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, FontAwesomeModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, IonicStorageModule.forRoot(), BrowserAnimationsModule],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    { provide: LOCALE_ID, useValue:"da-DK"},
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private library: FaIconLibrary) {
        // Add an icon to the library for convenient access in other components
        library.addIcons(faPencilAlt, faBoxOpen, faMinus, faPlus, faTimes);
  }
}
