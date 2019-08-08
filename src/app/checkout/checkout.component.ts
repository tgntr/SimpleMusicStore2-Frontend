import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddressDetails } from '../_models/address/addressDetails';
import { BaseComponent } from '../_helpers/base.component';
import { takeUntil } from 'rxjs/operators';
import { NewAddress } from '../_models/address/newAddress';
import { Router } from '@angular/router';
import { AddressService } from '../_services/address.service';
import { ShoppingCartService } from '../_services/shopping-cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent extends BaseComponent implements OnInit {

  addresses: AddressDetails[];
  isInCheckout = false;
  selectedAddress: number;
  selectAddressForm: FormGroup;
  newAddressForm: FormGroup
  submitted = false;
  completed = false;

  constructor(
    private shoppingCartService: ShoppingCartService,
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
    this.shoppingCartService.cart$.subscribe(cart=> {
      console.log(cart);
      if (!cart || cart.length <= 0) {
        this.router.navigate(['/']);
      }
      this.addressService.getAllByCurrentUser().pipe(takeUntil(this.unsubscribe)).subscribe(addresses => {
        console.log(addresses);
        this.addresses = addresses;
        this.isInCheckout = true;
      });
    }).unsubscribe();
    
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
        await this.addressService.getAllByCurrentUser().pipe(takeUntil(this.unsubscribe)).toPromise().then(addresses => {
          this.selectedAddress = addresses[addresses.length - 1].id;
        });
      });
    } else {
      this.selectedAddress = this.selectAddressForm.get('address').value;
    }
    this.shoppingCartService.completeOrder(this.selectedAddress).pipe(takeUntil(this.unsubscribe)).subscribe(() => {
      this.shoppingCartService.cart.next(null);
      this.completed=true;
    })
  }

}
