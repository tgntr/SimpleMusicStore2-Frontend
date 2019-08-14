import { Component, OnInit } from '@angular/core';
import { AddressService } from '../_services/address.service';
import { AddressDetails } from '../_models/address/addressDetails';
import { BaseComponent } from '../_helpers/base.component';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NewAddress } from '../_models/address/newAddress';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent extends BaseComponent implements OnInit {
  addresses: AddressDetails[];
  newAddressForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private addressService: AddressService) { super() }

  ngOnInit() {
    this.addressService.getAllByCurrentUser()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(addresses => this.addresses = addresses);
  }

  remove(index) {
    this.addressService.remove(this.addresses[index].id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => this.addresses.splice(index, 1));
  }

  openNewAddressForm() {
    this.newAddressForm = this.formBuilder.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  closeNewAddressForm() {
    this.newAddressForm = null;
    this.submitted = false;
  }

  async addNewAddress() {
    this.submitted = true;
    if (this.newAddressForm.invalid) {
      return;
    }

    let newAddress = new NewAddress();
    newAddress.country = this.newAddressForm.get('country').value;
    newAddress.city = this.newAddressForm.get('city').value;
    newAddress.street = this.newAddressForm.get('street').value;
    this.addressService.add(newAddress)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(()=> {
        this.closeNewAddressForm();
        this.ngOnInit();
      });
  }
}
