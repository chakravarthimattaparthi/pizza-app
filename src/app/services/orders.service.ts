import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  orderDeteils = new Subject<any>();
  constructor(private http: HttpClient) { }
  getOrders(): Observable<any> {
    return this.http.get('../../assets/json/orders.json');
  }
  setOrderDetails(details) {
    this.orderDeteils.next(details);
  }
}
