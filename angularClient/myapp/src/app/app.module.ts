import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { FormsModule }      from '@angular/forms';
import {HttpClientModule}   from '@angular/common/http';
import { AppComponent }     from './app.component';
import { OrderComponent }   from './app.placeOrder';
import { AddItemsComponent }  from './app.addItems';
import { ViewOrderComponent } from './app.viewOrders';
import { routing }          from './app.routing';


@NgModule({
  declarations: [
    AppComponent, OrderComponent, AddItemsComponent, ViewOrderComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
