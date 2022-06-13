import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PricelistComponent } from './pricelist/pricelist.component';
import { DetailEditComponent } from './detail-edit/detail-edit.component';
import { RequestsInterceptorService } from './services/requests.interceptor.service';

@NgModule({
  declarations: [AppComponent, PricelistComponent, DetailEditComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestsInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
