import {AppComponent} from './app/app.component';
import {bootstrapApplication} from "@angular/platform-browser";
import {enableProdMode} from "@angular/core";

enableProdMode();

bootstrapApplication(AppComponent)
  .catch(err => console.error(err));
