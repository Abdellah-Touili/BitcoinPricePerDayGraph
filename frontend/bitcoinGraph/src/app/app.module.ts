import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { HttpClientModule} from '@angular/common/http'; 
import { ChartsModule } from 'ng2-charts';
import { ChartDayPriceComponent } from './components/chart-day-price/chart-day-price.component';



@NgModule({
  declarations: [
    AppComponent,
    ChartDayPriceComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    ChartsModule
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
