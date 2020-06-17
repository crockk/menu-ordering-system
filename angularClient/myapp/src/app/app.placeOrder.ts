import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const BASE_URL = "http://localhost:1337";

@Component({
    selector: 'placeOrder',
    templateUrl:'./placeOrder.html'
})
export class OrderComponent {
    _productsArray: Array<any>;
    _ordersArray: Array<any>;
    _http:HttpClient;
    _id:Number;
    _productName:String;
    _price:Number;
    _quantity:Number = 0;
    _editableProductName:String="";
    _errorMessage:String = "";
    _editId:Number = null;
    _singleProductNumber : Number = null;
    _singleProductName: String = "";
    _singleProductPrice: Number = null;
    _singleProductQuantity: Number = null;
    _serverName:String = "";
    _discount:boolean = false;
    _discountVal:String = '0.00';
    _quantities: { [_id: number]: number } = {};
    _subtotal:String = '0.00';
    _total:String = '0.00';
    _tax:String = '0.00';
    _date:Date = new Date()


    // Since we are using a provider above we can receive
    // an instance through a constructor.
    constructor(private http: HttpClient) {
        this._http = http;
        this.getAllProducts();
    }

    getAllProducts(quantities=null) {
      let url = BASE_URL + '/Product/Index'
      this._http.get<any>(url)
          // Get data and wait for result.
          .subscribe(result => {
              this._productsArray = result.products;

              if(quantities != null){
                this._quantities = quantities
              }
              else {
                for(let i=0; i < this._productsArray.length; i++) {
                  this._quantities[this._productsArray[i]._id] = 0
                }
              }

          },

          error =>{
            // Let user know about the error.
              this._errorMessage = error;
          })
    }

    getAllOrders() {
      let url = BASE_URL + '/Order/Index'
      this._http.get<any>(url)
          // Get data and wait for result.
          .subscribe(result => {
            this._ordersArray = result.orders;
          },
  
          error =>{
            // Let user know about the error.
              this._errorMessage = error;
          })
    }

    discount() {
      this._discount = !this._discount;
      this.calcOrder(this._discount);
    }

    alterOrder(id, action) {;
      if (this._quantities && action == '+') {
        this._quantities[id] += 1;
        this.calcOrder(this._discount);
      } else if (this._quantities && action == '-' && this._quantities[id] > 0){
        this._quantities[id] -= 1;
        this.calcOrder(this._discount);
      } else {
        this._quantities[id] = 0;
        this.calcOrder(this._discount);
      }
    }

    calcOrder(discount) {
      let subtotal = 0;
      let total = 0;
      let tax = 0.07;
      let taxAmt = 0;
      let discountVal = 0

      for(let i=0;i<this._productsArray.length;i++) {
        let currentPrice = this._productsArray[i].price;
        if(this._quantities[this._productsArray[i].id] != 0) {
          subtotal = subtotal +( currentPrice * this._quantities[this._productsArray[i]._id] ) ;
        }
      }

      taxAmt = subtotal * tax;

      if (discount){
        discountVal = subtotal * 0.15
        this._discountVal = (discountVal.toFixed(2));
      }

      total = taxAmt + subtotal - discountVal;


      this._subtotal = (subtotal.toFixed(2));
      this._tax = (taxAmt.toFixed(2));
      this._total = (total.toFixed(2));
    }

    clearOrder() {
      this._quantities = {};
      this.getAllProducts();
      this._serverName = "";
      this._errorMessage = "";
      this._discountVal = '0.00';
      this._subtotal = '0.00';
      this._total = '0.00';
      this._tax = '0.00';
    }

    submitOrder() {
      this._date = new Date()

      if(this._serverName == ''){
        this._errorMessage = 'Please enter a server name before clicking submit.';
      }
      else{
        this.http.post(BASE_URL + '/Order/CreateOrder', 
          {
            serverName: this._serverName,
            orderDate: this._date,
            total: this._total
          })
          .subscribe(        
            // Data is received from the post request.
            (data) => {
                // Inspect the data to know how to parse it.
                console.log("POST call successful. Inspect response.",
                            JSON.stringify(data));
                this._errorMessage = data["errorMessage"];
            },
            // An error occurred. Data is not received.
            error => {
                this._errorMessage = error;
            });
          this.clearOrder();
          }
    }
}
