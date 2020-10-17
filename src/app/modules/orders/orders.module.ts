import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRouterModule } from './orders.routing.module';
import { OrdersService} from '../../services/orders.service';
import { OrdersComponent } from './orders/orders.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [ OrdersComponent ],
  imports: [
    CommonModule,
    OrdersRouterModule,
    HttpClientModule
  ],
  providers: [
    OrdersService
  ]
})
export class OrdersModule { }
