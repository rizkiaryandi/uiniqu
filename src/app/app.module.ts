import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'; 
import { Storage } from '@ionic/storage';


import { PopoverComponent } from './home/quran/read/popover/popover.component';
import { PopoverHeaderComponent } from './home/quran/read/popover-header/popover-header.component';
import { TafsirComponent } from './home/quran/tafsir/tafsir.component';
import { PlayComponent } from './home/quran/play/play.component';

@NgModule({
  declarations: [AppComponent, PopoverComponent, PopoverHeaderComponent, TafsirComponent, PlayComponent],
  entryComponents: [PopoverComponent, PopoverHeaderComponent, TafsirComponent, PlayComponent],
  imports: [BrowserModule, IonicModule.forRoot({
    backButtonText: ''
  }), AppRoutingModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Storage ],
  bootstrap: [AppComponent],
})
export class AppModule {}
