import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { AddressDetails } from '../_models/address/addressDetails';
import { NewAddress } from '../_models/address/newAddress';
import { ArtistView } from '../_models/artistView';
import { FollowDetails } from '../_models/followDetails';

@Injectable({ providedIn: 'root' })
export class ArtistService {
    constructor(private http: HttpClient) { }

    getArtistDetails(id: number): Observable<ArtistView> {
        return this.http.get<ArtistView>(`${environment.url}/artist/details/${id}`);
    }

    getFollowedArtists(page: number): Observable<FollowDetails[]> {
        return this.http.get<FollowDetails[]>(`${environment.url}/activity/followedArtists?page=${page}`);
    }

    follow(id: number): Observable<any> {
        return this.http.get<ArtistView>(`${environment.url}/follow/followArtist/${id}`);
    }

    unfollow(id: number): Observable<any> {
        return this.http.get<ArtistView>(`${environment.url}/follow/unfollowArtist/${id}`);
    }
}