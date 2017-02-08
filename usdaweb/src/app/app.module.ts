import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Locator } from 'micro-locator';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { DescriptionsComponent } from './descriptions/descriptions.component';

import { AppStateService } from './app-state.service';
import { NutrientsComponent } from './nutrients/nutrients.component';


export function LocatorFactory() {
  let locator = new Locator();
  locator.configure(environment.configuration);
  return locator;
}

@NgModule({
  declarations: [
    AppComponent,
    DescriptionsComponent,
    NutrientsComponent,
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
