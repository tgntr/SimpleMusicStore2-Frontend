import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { AddressDetails } from '../_models/address/addressDetails';
import { NewAddress } from '../_models/address/newAddress';

@Injectable({ providedIn: 'root' })
export class AddressService {
    constructor(private http: HttpClient) { }

    getAllByCurrentUser(): Observable<AddressDetails[]> {
        return this.http.get<AddressDetails[]>(`${environment.url}/address/findAll`);
    }
    add(address: NewAddress): Observable<any>{
        return this.http.post(`${environment.url}/address/add`, address);
    }

    edit(address: AddressDetails): Observable<any>{
        return this.http.post(`${environment.url}/address/edit`, address);
    }

    remove(id: number): Observable<any> {
        return this.http.get(`${environment.url}/address/remove/${id}`);
    }

}