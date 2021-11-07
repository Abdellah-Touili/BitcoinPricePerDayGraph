import { formatDate } from '@angular/common';
import { Component, OnInit,ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { NgbCalendar, NgbDatepicker, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { GetDayPriceBitcoinService } from 'src/app/services/get-day-price-bitcoin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{

  @ViewChild('d1') datePopup1? : NgbDatepicker;
  @ViewChild('d2') datePopup2? : NgbDatepicker;
  modelStartDate: NgbDateStruct;
  modelEndDate: NgbDateStruct;
  
   today = new Date();
   theStartdate = new Date();
   dateRangeLength = 10;

   //To force the User not to choose/select in the 'DatePicker' a date LATER than today
   maxDateBitcoin:NgbDateStruct = {year: this.today.getFullYear(), month: this.today.getMonth() + 1, 
    day: this.today.getDate()};
   
   //To Show or Hide the Bitcoin Graph
   showChartBitcoin = false;

   //When the web application is launched for the first time : the 'start date' is set for 'Today'
   //And the 'end date' is set for 'Today' - 10 days
   formRangeDate = new FormGroup({
    startDate: new FormControl(this.theStartdate),
    endDate: new FormControl(this.today)
   });
  
  constructor(private dayPriceBitcoinService: GetDayPriceBitcoinService,private calendar: NgbCalendar) 
  { 
    //Config the Models of the dates and Initialize them 
    this.modelStartDate = { year: 2021, month: 11, day: 8 };
    this.modelEndDate = { year: 2021, month: 11, day: 8 };
    this.selectToday();
  }

  selectToday() {
    this.modelStartDate = this.calendar.getNext(this.calendar.getToday(), 'd', - this.dateRangeLength);
    this.modelEndDate = this.calendar.getToday();
  }
  ngOnInit(): void {
    this.theStartdate.setDate(this.today.getDate()-this.dateRangeLength);
  }

  //handle the data sended by the Form
  submit(){

    //The NgbDatePicker dates are sent, via the Form, in a JSON Format
    //And must be converted to Date Objects and be Formated
      var startDateModel = new Date(this.formRangeDate.value.startDate.year, this.formRangeDate.value.startDate.month -1, this.formRangeDate.value.startDate.day);
      var startDate = formatDate(startDateModel, 'yyyy-MM-dd', 'en');
      
      var endDateModel = new Date(this.formRangeDate.value.endDate.year, this.formRangeDate.value.endDate.month -1, this.formRangeDate.value.endDate.day);
      var endDate = formatDate(endDateModel, 'yyyy-MM-dd', 'en');

      var rangeDate={"startDate":startDate,"endDate":endDate};

      //To send, via the service, the dates range (start and end dates), to the component-Graph (chart-day-price)
      this.dayPriceBitcoinService.invokeEvent.next(JSON.stringify(rangeDate));

      //Once the 'dates range' are received from the Form, the Graph/Chart component 'chart-day-price' could be shown
      this.showChartBitcoin = true;

  }

}


