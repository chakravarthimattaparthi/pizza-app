import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  orderDetails;
  constructor(private router: Router) { 
    this.orderDetails = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void {
    if (this.orderDetails) {
      localStorage.setItem('orderDetails', JSON.stringify(this.orderDetails));
    }
    console.log(JSON.parse(localStorage.getItem('orderDetails')));
    this.orderDetails = this.orderDetails ? this.orderDetails : JSON.parse(localStorage.getItem('orderDetails'));
  }

}
