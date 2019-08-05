import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../_services/order.service';
import { OrderView } from '../_models/orderView';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @Input() id: number;
  order: OrderView;

  constructor(private route: ActivatedRoute, private orderService: OrderService, private router: Router, private datePipe: DatePipe) { }

  ngOnInit() {
    let parameterId = +this.route.snapshot.paramMap.get('id');
    if (!this.id && !parameterId) {
      this.router.navigate(['/']);
    }
    this.orderService.getOrderDetails(parameterId || this.id).subscribe(order=>this.order=order);
  }

  formatDate(date: Date) {
    return this.datePipe.transform(date, 'MMMM d, y, h:mm:ss a')
  }
}


