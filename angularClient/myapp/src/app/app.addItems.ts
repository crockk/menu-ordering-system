import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const BASE_URL = "http://localhost:3000";

@Component({
  selector: 'addItems',
  templateUrl: './addItems.html'
})


export class AddItemsComponent { 
  _productsArray: Array<any>;
  _http:HttpClient;
  _id:Number;
  _productName:String;
  _price:Number;
  _editableProductName:String="";
  _errorMessage:String = "";
  _editId:Number = null;
  _singleProductNumber : Number = null;
  _singleProductName: String = "";
  _singleProductPrice: Number = null;
  _singleProductQuantity: Number = null;
  _total:number = 0;



  constructor(private http: HttpClient) {
    this._http = http;
    this.getAllProducts();
}


  getAllProducts() {
    let url = BASE_URL + '/Product/Index'
    this._http.get<any>(url)
        // Get data and wait for result.
        .subscribe(result => {
            this._productsArray = result.products;
        },

        error =>{
          // Let user know about the error.
            this._errorMessage = error;
        })
  }
  
  getProduct(id) {
    let url = BASE_URL + '/Product/Detail?_id=' + id;

    this._http.get<any>(url)
        // Get data and wait for result.
        .subscribe(result => {
            this._singleProductName = result.product.productName;
            this._singleProductNumber = result.product._id;
            this._singleProductPrice = result.product.price;
            this._singleProductQuantity = result.product.quantity
        },

        error =>{
          // Let user know about the error.
            this._errorMessage = error;
        })
  }

  createProduct() {

      // This free online service receives post submissions.
      this.http.post(BASE_URL + "/Product/CreateProduct",
          {
              _id:  this._id,
              productName:   this._productName,
              price: parseFloat(String(this._price)).toFixed(2)
          })
      .subscribe(
          // Data is received from the post request.
          (data) => {
              // Inspect the data to know how to parse it.
              console.log("POST call successful. Inspect response.",
                          JSON.stringify(data));

              // Create user friendly error message
              this._errorMessage = ''
              if(this._id == null || this._productName == null || this._price == null) {
                this._errorMessage = 'Please fill out all fields.';
              }
              else {
                if(data['errorMessage'].includes('price: Cast to Number failed for value')){
                  this._errorMessage = 'Please enter a valid price (do not include number sign.)\n';
                }
                else if (data['errorMessage'].includes('_id: Cast to Number failed for value')
                          || data['errorMessage'].includes('is more than maximum allowed value (1000000).')){
                  this._errorMessage += 'Please enter a valid ID (non-negative number, 0 - 1,000,000)';
                }
                else {
                  this._errorMessage = data['errorMessage']
                }
              }

              this.getAllProducts();

          },
          // An error occurred. Data is not received.
          error => {
            this._errorMessage = 'An unknown error occured. Try refreshing the page and trying again.'
        });
  }

  deleteProduct(_id) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      "body": { _id:_id}
    };

    let url = BASE_URL + "/Product/Delete"
    this.http.delete(  url , httpOptions)
    .subscribe(
        // Data is received from the post request.
        (data) => {
            this._errorMessage = data["errorMessage"];
            this.getAllProducts();
        },
        // An error occurred. Data is not received.
        error  => {
          this._errorMessage = error;
        });
  }


}