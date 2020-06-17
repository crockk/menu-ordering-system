import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template:
    `
    <nav>
    <a routerLink="/place-order" routerLinkActive="active">Place Order</a> |
    <a routerLink="/add-items" routerLinkActive="active">Add Menu Items</a> |
    <a routerLink="/view-orders" routerLinkActive="active">View Orders</a>
    </nav>
    <br>
    <!-- Where router should display a view -->
    <router-outlet></router-outlet>
    `
})
export class AppComponent { }

