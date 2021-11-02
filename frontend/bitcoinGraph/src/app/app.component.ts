import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GetDayPriceBitcoinService } from 'src/app/services/get-day-price-bitcoin.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit{

   today = new Date();
   theStartdate = new Date();
   dateRangeLength = 10;

   //To force the User not to choose/select in the 'DatePicker' a date LATER than today
   maxDateBitcoin = new Date();
   date = new Date();
   showChartBitcoin = false;

  formRangeDate = new FormGroup({

    startDate: new FormControl(this.theStartdate),
    endDate: new FormControl(this.today),
    resultPicker: new FormControl(this.today),
    nameControl : new FormControl('')

  });

 constructor(private dayPriceBitcoinService: GetDayPriceBitcoinService) 
   { }

 ngOnInit(): void {

  //When the application is launched for the FIRST time: the 'start date' must be the date of today
  //Minus 10 days. And the 'end date' must be the date of today
  this.theStartdate.setDate(this.today.getDate()-this.dateRangeLength);
  this.submit();
 }


 submit(){

  var startDate = formatDate(this.formRangeDate.value.startDate, 'yyyy-MM-dd', 'en');
  var endDate = formatDate(this.formRangeDate.value.endDate, 'yyyy-MM-dd', 'en');
  var rangeDate={"startDate":startDate,"endDate":endDate};
 
  //To send, via the service, the dates range (star and end dates), to the component-Graph (chart-day-price)
  this.dayPriceBitcoinService.invokeEvent.next(JSON.stringify(rangeDate));

   //Once the 'dates range' are received from the Form, the Graph/Chart component 'chart-day-price' could be shown
   this.showChartBitcoin = true;

}


}

