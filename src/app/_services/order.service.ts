import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Newsfeed } from '../_models/newsfeed';
import { OrderView } from '../_models/orderView';
import { OrderDetails } from '../_models/orderDetails';

@Injectable({ providedIn: 'root' })
export class OrderService {
    constructor(private http: HttpClient) { }

    getOrderDetails(id: number): Observable<OrderView>{
        return this.http.get<OrderView>(`${environment.url}/order/details/${id}`);
    }

    getAllByUser() : Observable<OrderDetails[]>{
        return this.http.get<OrderDetails[]>(`${environment.url}/activity/orders`);
    }
}