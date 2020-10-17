import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../services/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  ordersList: any;
  currentStatus: string;
  displayStatus: string;
  displayButtonName: string;
  btnClass: string;
  constructor(private orderService: OrdersService, private route: Router) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((data) => {
      this.ordersList = data;
      this.ordersList.forEach((item, index) => {
        this.setDisplayStatus(item);
        item.totalCount = this.itemsTotal(item.items);
      });
    });
  }
  itemsTotal = (items) => {
    return items.reduce((sum, i) => {
      return sum + (i.itemCost * i.items );
    }, 0);
  }

  setDisplayStatus(item) {
    switch (item.status) {
      case 'ordered' :
        item.displayStatus = 'Ordered';
        item.buttonName = 'Accept';
        item.btnClass = 'btn-primary';
        break;
      case 'in-progress' :
        item.displayStatus = 'In Progress';
        item.buttonName = 'Deliver';
        item.btnClass = 'btn-warning';
        break;
      case 'ready-to-deliver' :
        item.displayStatus = 'Ready To Deliver';
        item.buttonName = 'Delivered';
        item.btnClass = 'btn-warning';
        break;
      case 'delivered' :
        item.displayStatus = 'Delivered';
        item.btnClass = 'btn-success';
        item.buttonName = 'Complete';
        break;
      case 'complete' :
        item.displayStatus = 'Completed';
        item.buttonName = 'Completed';
        item.btnClass = 'btn-success';
        break;
      default:
        item.displayStatus = 'Ordered';
        item.buttonName = 'Ordered';
    }
  }

  changeStatus(event, index) {
    event.stopPropagation();
    this.checkStaus(this.ordersList[index].status);
    this.ordersList[index].status = this.currentStatus;
    this.ordersList[index].displayStatus = this.displayStatus;
    this.ordersList[index].btnClass = this.btnClass;
    this.changeButtonName(this.ordersList[index].status);
    this.ordersList[index].buttonName = this.displayButtonName;
  }

  rejectOrder(event, index) {
    event.stopPropagation();
    this.ordersList[index].isRejected = this.ordersList[index].isRejected ? false : true;
  }
  checkStaus(status) {
    switch (status) {
      case 'ordered' :
        this.currentStatus = 'in-progress';
        this.displayStatus = 'In Progress';
        this.btnClass = 'btn-warning';
        break;
      case 'in-progress' :
        this.currentStatus = 'ready-to-deliver';
        this.displayStatus = 'Ready To Deliver';
        this.btnClass = 'btn-warning';
        break;
      case 'ready-to-deliver' :
        this.currentStatus = 'delivered';
        this.displayStatus = 'Delivered';
        this.btnClass = 'btn-success';
        break;
      case 'delivered' :
        this.currentStatus = 'complete';
        this.displayStatus = 'Completed';
        this.btnClass = 'btn-success';
        break;
      case 'complete' :
        this.currentStatus = 'completed';
        this.displayStatus = 'Completed';
        this.btnClass = 'btn-success';
        break;
      default:
        this.currentStatus = 'ordered';
        this.displayStatus = 'Ordered';
        this.btnClass = 'btn-warning';
    }
  }

  changeButtonName(status) {
    switch (status) {
      case 'ordered' :
        this.displayButtonName = 'Accept';
        break;
      case 'in-progress' :
        this.displayButtonName = 'Deliver';
        break;
      case 'ready-to-deliver' :
        this.displayButtonName = 'Delivered';
        break;
      case 'delivered' :
        this.displayButtonName = 'Complete';
        break;
      case 'complete' :
        this.displayButtonName = 'Completed';
        break;
      default:
        this.displayButtonName = 'Accept';
    }
  }

  goToDetails(index) {
    this.orderService.setOrderDetails(this.ordersList[index]);
    this.orderService.orderDeteils.subscribe(value => {
    });
    this.route.navigate(['order-details'], {state: this.ordersList[index]});
  }
}
