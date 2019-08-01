import { AddressDetails } from './address/addressDetails';
import { CartItem } from './cartItem';

export class OrderView {
    id: number;
    totalPrice: number;
    date: Date;
    deliveryAddress: AddressDetails;
    items: CartItem[];
}