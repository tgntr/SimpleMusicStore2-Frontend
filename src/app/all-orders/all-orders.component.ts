import { Component, OnInit } from '@angular/core';
import { OrderService } from '../_services/order.service';
import { OrderDetails } from '../_models/orderDetails';
import { DatePipe } from '@angular/common';
import { BaseComponent } from '../_helpers/base.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent extends BaseComponent implements OnInit {
  orders: OrderDetails[];
  page: number = 1;
  constructor(private orderService: OrderService, private datePipe: DatePipe) { super() }

  ngOnInit() {
    debugger;
    this.orderService.getAllByUser(this.page).pipe(takeUntil(this.unsubscribe)).subscribe(orders => {
      this.orders = orders;
    });
  }

  formatDate(date: Date) {
    return this.datePipe.transform(date, 'MMMM d, y, h:mm:ss a')
  }

  onScroll() {
    this.page++;
    this.orderService.getAllByUser(this.page).pipe(takeUntil(this.unsubscribe)).subscribe(orders => {
      this.orders = this.orders.concat(orders);
    });
  }
}
