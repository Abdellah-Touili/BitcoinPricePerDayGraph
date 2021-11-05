import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'; 
import { ChartsModule } from 'ng2-charts';
import { ChartDayPriceComponent } from './components/chart-day-price/chart-day-price.component';
import { HttpInterceptorService } from './services/http-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    ChartDayPriceComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ChartsModule,
    NgbModule 
  ],
  
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
    },
      
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
