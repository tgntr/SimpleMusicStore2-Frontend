import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../_services/order.service';
import { OrderView } from '../_models/orderView';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  id: number;
  order: OrderView;

  constructor(private activatedRoute: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.orderService.getOrderDetails(+params.get('id')).subscribe(order=>this.order=order);
    });
  }
}


