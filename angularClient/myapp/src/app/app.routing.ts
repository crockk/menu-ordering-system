import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { AppComponent }          from './app.component';
import { OrderComponent }        from './app.placeOrder';
import { AddItemsComponent }     from './app.addItems';
import { ViewOrderComponent }    from './app.viewOrders';

const appRoutes: Routes = [
  { path: 'place-order', component: OrderComponent },
  { path: 'add-items', component: AddItemsComponent },
  {path: 'view-orders', component: ViewOrderComponent},
  { path: '', redirectTo: '/place-order', pathMatch: 'full' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
