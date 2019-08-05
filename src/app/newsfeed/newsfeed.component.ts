import { Component, OnInit } from '@angular/core';
import { Newsfeed } from '../_models/newsfeed';
import { NewsfeedService } from '../_services/newsfeed.service';
import { AuthService } from 'angularx-social-login';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { Router } from '@angular/router';
import { RecordDetails } from '../_models/recordDetails';
import { CartItem } from '../_models/cartItem';
import { BaseComponent } from '../_helpers/base.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent extends BaseComponent implements OnInit {
  loading = false;
  newsfeed: Newsfeed;
  isAuthenticated = false;

  constructor(
    private newsfeedService: NewsfeedService, 
    private authService: AuthService, 
    private shoppingCartService: ShoppingCartService, 
    private router: Router) { super();}

  ngOnInit() {
    this.loading = true;
    this.authService.authState.pipe(takeUntil(this.unsubscribe)).subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
      }
    });
    this.newsfeedService.getNewsfeed().pipe(takeUntil(this.unsubscribe)).subscribe(newsfeed => {
        this.newsfeed = newsfeed;
        this.loading = false;
    });
  }

  addToCart(record: RecordDetails) {
    this.shoppingCartService.addToCart(record.id).pipe(takeUntil(this.unsubscribe)).subscribe(() => {
      let updatedCart;
      this.shoppingCartService.cart$.subscribe(cart=> {
        debugger;
        updatedCart = cart;
        var itemExists = updatedCart.find(i=>i.id === record.id);
        if (itemExists) {
          itemExists.quantity ++;
        } else {
          let newItem = new CartItem();
          newItem.id = record.id;
          newItem.image = record.image;
          newItem.price = record.price;
          newItem.quantity = 1;
          newItem.title = record.title;
          updatedCart.push(newItem);
        }
      }).unsubscribe();
      this.shoppingCartService.cart.next(updatedCart);
    });
  }
}
