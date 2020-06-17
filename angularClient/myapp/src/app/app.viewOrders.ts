import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const BASE_URL = "http://localhost:1337";

@Component({
    selector: 'viewOrders',
    templateUrl:'./viewOrders.html'
})
export class ViewOrderComponent {
    _ordersArray: Array<any>;
    _http:HttpClient;
    _errorMessage: String= '';

    constructor(private http: HttpClient) {
        this._http = http;
        this.getAllOrders();
    }


    
    getAllOrders() {
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let prettyDate;
        let url = BASE_URL + '/Order/Index'
        this._http.get<any>(url)
            // Get data and wait for result.
            .subscribe(result => {
              this._ordersArray = result.orders;
              for(let i=0; i < this._ordersArray.length; i++) {
                  prettyDate = new Date(this._ordersArray[i]['orderDate'])
                  this._ordersArray[i]['orderDate'] = prettyDate.getFullYear() +  ' '
                    + months[prettyDate.getMonth()] + ' '
                    + prettyDate.getDate() + ', '
                    + this.format12Hr(prettyDate)
              }
            },
    
            error =>{
              // Let user know about the error.
                this._errorMessage = error;
            })
      }

      format12Hr(date) {
        let hr = date.getHours();
        let min = date.getMinutes();
        let timeOfDay = '';

        if(hr > 12){
            timeOfDay = 'PM';
            hr = hr - 12;
        } else {
            timeOfDay = 'AM'
        }

        if(min < 10) {
            min = '0' + String(min)
        }

        let formattedDate = String(hr) + ':' + min + timeOfDay;

        return formattedDate
      }
}
