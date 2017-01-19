import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Locator } from 'micro-locator';

import { AppComponent } from './app.component';
import { DescriptionsComponent } from './descriptions/descriptions.component';

import { AppStateService } from './app-state.service';


export function LocatorFactory() {
  let locator = new Locator();

  locator.configure([{
    rebase: ['/descriptions', 'http://localhost:3000/'],
    truncate: true
  }]);

  return locator;
}

@NgModule({
  declarations: [
    AppComponent,
    DescriptionsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ { provide: Locator, useFactory: LocatorFactory }, AppStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
