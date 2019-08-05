import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { CartItem } from '../_models/cartItem';
import { subscribeOn } from 'rxjs/operators';
import { HttpBackend } from '@angular/common/http';
import {Location} from '@angular/common';
import { AddressDetails } from '../_models/address/addressDetails';
import { AddressService } from '../_services/address.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewAddress } from '../_models/address/newAddress';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
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
      console.log(location.path());
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
    this.loading=true;
    this.shoppingCartService.getCart().subscribe(cart=> {
      console.log(cart);
      if (cart.length > 0) {
        this.items = cart;
      }
      
      this.loading = false;
    });
  }

  get totalPrice() {
    return this.items.reduce((prev, curr) => prev + (curr.price*curr.quantity), 0);
  }
  
  backToPreviousPage() {
    this.location.back();
  }

  decreaseQuantity(index) {
    this.shoppingCartService.decreaseQuantity(this.items[index].id).subscribe(()=> {
      let quantity = this.items[index].quantity;
      if (quantity === 1) {
        this.items.splice(index, 1);
      } else {
        this.items[index].quantity = quantity - 1;
      }
    })
  }

  increaseQuantity(index) {
    this.shoppingCartService.increaseQuantity(this.items[index].id).subscribe(()=> {
      let quantity = this.items[index].quantity;
      this.items[index].quantity ++;
    });
  }

  removeFromCart(index) {
    this.shoppingCartService.removeFromCart(this.items[index].id).subscribe(() => {
      this.items.splice(index, 1);
    });
  }

  checkout() {
    if (!this.items) {
      return;
    }
    this.addressService.getAllByCurrentUser().subscribe(addresses => {
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
      await this.addressService.add(newAddress).toPromise().then(async () => {
        await this.addressService.getAllByCurrentUser().toPromise().then(addresses=> {
          console.log(addresses);
          this.selectedAddress = addresses[addresses.length-1].id;
          console.log(this.selectedAddress);
        });
      });
    } else {
      this.selectedAddress = this.selectAddressForm.get('address').value;
    }
    this.shoppingCartService.completeOrder(this.selectedAddress).subscribe(() => this.router.navigate(['/']))
  }
}
