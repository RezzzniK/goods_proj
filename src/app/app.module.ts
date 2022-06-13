import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
// //angular material modules
import { MatDialogModule } from '@angular/material/dialog';
//import { MatTableModule } from '@angular/material/table';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatInputModule } from '@angular/material/input';
// import { MatCardModule } from '@angular/material/card';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { MatSnackBarModule } from '@angular/material/snack-bar';

//components/services/models
import { AppComponent } from './app.component';
import { PricelistComponent } from './pricelist/pricelist.component';
import { DetailEditComponent } from './detail-edit/detail-edit.component';
import { RequestsInterceptorService } from './services/requests.interceptor.service';

@NgModule({
  declarations: [AppComponent, PricelistComponent, DetailEditComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    FormsModule,
    MatDialogModule,
  ],
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
