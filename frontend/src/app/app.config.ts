import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {AuthService} from './auth/auth.service';
import {AuthInterceptor} from './auth/auth.interceptor';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AppRouting, routes} from './app.routes';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {Chart} from "chart.js";
import {provideCharts, withDefaultRegisterables} from "ng2-charts";


@NgModule({
  declarations: [
    AppComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent] // Nếu có
  , imports: [BrowserModule,
              AppRouting,

    ],
  providers: [
    provideCharts(withDefaultRegisterables()),
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class Appconfig {
}





