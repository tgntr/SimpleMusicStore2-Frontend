import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { CartItem } from '../_models/cartItem';
import { subscribeOn, takeUntil } from 'rxjs/operators';
import { HttpBackend } from '@angular/common/http';
import {Location} from '@angular/common';
import { AddressDetails } from '../_models/address/addressDetails';
import { AddressService } from '../_services/address.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewAddress } from '../_models/address/newAddress';
import { Router } from '@angular/router';
import { BaseComponent } from '../_helpers/base.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent extends BaseComponent implements OnInit {
  items: CartItem[];
  loading = false;
  addresses: AddressDetails[];
  isInCheckout = false;
  selectedAddress: number;
  selectAddressForm: FormGroup;
  newAddressForm: FormGroup
  submitted = false;

  constructor(
    private shoppingCartService: ShoppingCartService, 
    private location: Location, 
    private addressService: AddressService,
    private formBuilder: FormBuilder,
    private router: Router) {
      super();

      this.selectAddressForm = this.formBuilder.group({
        address: ['', Validators.required]
      });

     this.newAddressForm = this.formBuilder.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required]
     });
    }

  ngOnInit() {
    debugger;
    this.loading=true;
    this.shoppingCartService.getCart().pipe(takeUntil(this.unsubscribe)).subscribe(cart=> {
      this.shoppingCartService.cart.next(cart);
      this.shoppingCartService.cart$.subscribe(cart=> {
        if (cart.length > 0) {
          this.items = cart;
        }
        this.loading = false;
      });
    })
  }

  get totalPrice() {
    if (!this.items || this.items.length === 0) {
      return 0;
    } else {
      return this.items.reduce((prev, curr) => prev + (curr.price*curr.quantity), 0);
    }
  }
  
  backToPreviousPage() {
    this.location.back();
  }

  decreaseQuantity(index) {
    this.shoppingCartService.decreaseQuantity(this.items[index].id).pipe(takeUntil(this.unsubscribe)).subscribe(()=> {
      let quantity = this.items[index].quantity;
      if (quantity === 1) {
        this.items.splice(index, 1);
      } else {
        this.items[index].quantity = quantity - 1;
      }
      this.shoppingCartService.cart.next(this.items);
    })
  }

  increaseQuantity(index) {
    this.shoppingCartService.increaseQuantity(this.items[index].id).pipe(takeUntil(this.unsubscribe)).subscribe(()=> {
      this.items[index].quantity ++;
      this.shoppingCartService.cart.next(this.items);
    });
  }

  removeFromCart(index) {
    this.shoppingCartService.removeFromCart(this.items[index].id).pipe(takeUntil(this.unsubscribe)).subscribe(() => {
      this.items.splice(index, 1);
      this.shoppingCartService.cart.next(this.items);
    });
  }

  checkout() {
    if (!this.items) {
      return;
    }
    this.addressService.getAllByCurrentUser().pipe(takeUntil(this.unsubscribe)).subscribe(addresses => {
      this.addresses = addresses;
      this.isInCheckout = true;
    });
  }

  async onSubmit() {
    this.submitted = true;
    if (this.selectAddressForm.invalid || (this.selectAddressForm.get('address').value === 0 && this.newAddressForm.invalid)) {
      return;
    }
    if (this.selectAddressForm.get('address').value === 0) {
      var newAddress = new NewAddress();
      newAddress.country = this.newAddressForm.get('country').value;
      newAddress.city = this.newAddressForm.get('city').value;
      newAddress.street = this.newAddressForm.get('street').value;
      await this.addressService.add(newAddress).pipe(takeUntil(this.unsubscribe)).toPromise().then(async () => {
        await this.addressService.getAllByCurrentUser().pipe(takeUntil(this.unsubscribe)).toPromise().then(addresses=> {
          this.selectedAddress = addresses[addresses.length-1].id;
        });
      });
    } else {
      this.selectedAddress = this.selectAddressForm.get('address').value;
    }
    this.shoppingCartService.completeOrder(this.selectedAddress).pipe(takeUntil(this.unsubscribe)).subscribe(() => { 
      this.shoppingCartService.cart.next(null);
      this.router.navigate(['/']);
    })
  }
}
