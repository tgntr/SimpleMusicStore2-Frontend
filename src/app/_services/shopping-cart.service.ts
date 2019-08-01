import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CartItem } from '../_models/cartItem';

@Injectable({ providedIn: 'root' })
export class ShoppingCartService {
    constructor(private http: HttpClient) { }

    addToCart(recordId: number): Observable<any> {
        return this.http.get(`${environment.url}/order/addtocart/${recordId}`);
    }

    removeFromCart(recordId: number): Observable<any> {
        return this.http.get(`${environment.url}/order/removefromcart/${recordId}`);
    }

    increaseQuantity(recordId: number): Observable<any> {
        return this.http.get(`${environment.url}/order/increasequantity/${recordId}`);
    }

    decreaseQuantity(recordId: number): Observable<any> {
        return this.http.get(`${environment.url}/order/decreasequantity/${recordId}`);
    }

    getCart(): Observable<CartItem[]> {
        return this.http.get<CartItem[]>(`${environment.url}/order/cart`);
    }

    completeOrder(addressId: number): Observable<any> {
        return this.http.get(`${environment.url}/order/complete?addressId=${addressId}`);
    }
}
