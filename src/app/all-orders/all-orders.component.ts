import { Component, OnInit } from '@angular/core';
import { OrderService } from '../_services/order.service';
import { OrderDetails } from '../_models/orderDetails';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {
  orders: OrderDetails[];
  constructor(private orderService: OrderService, private datePipe: DatePipe) { }

  ngOnInit() {
    debugger;
    this.orderService.getAllByUser().subscribe(orders => {
      this.orders = orders;
      console.log(orders);
    });
  }

  formatDate(date: Date) {
    return this.datePipe.transform(date, 'MMMM d, y, h:mm:ss a')
  }

}
