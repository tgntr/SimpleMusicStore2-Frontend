import { Component, OnInit, Input } from '@angular/core';
import { RecordDetails } from '../_models/recordDetails';
import { takeUntil } from 'rxjs/operators';
import { CartItem } from '../_models/cartItem';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { BaseComponent } from '../_helpers/base.component';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent extends BaseComponent implements OnInit {

  @Input() record: RecordDetails;
  constructor(private shoppingCartService: ShoppingCartService) { super()}

  ngOnInit() {
  }

  addToCart() {
    this.shoppingCartService.addToCart(this.record.id).pipe(takeUntil(this.unsubscribe)).subscribe(() => {
      let updatedCart;
      this.shoppingCartService.cart$.subscribe(cart => {
        updatedCart = cart;
      }).unsubscribe();
      var itemExists = updatedCart.find(i => i.id === this.record.id);
      if (itemExists) {
        itemExists.quantity++;
      } else {
        let newItem = new CartItem();
        newItem.id = this.record.id;
        newItem.image = this.record.image;
        newItem.price = this.record.price;
        newItem.quantity = 1;
        newItem.title = this.record.title;
        updatedCart.push(newItem);
      }
      this.shoppingCartService.cart.next(updatedCart);
    });
  }
}
