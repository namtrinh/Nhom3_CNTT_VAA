import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { Appconfig } from './app/app.config';


platformBrowserDynamic().bootstrapModule(Appconfig)
  .catch(err => console.error(err));