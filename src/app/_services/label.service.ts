import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { LabelView } from '../_models/labelView';
import { FollowDetails } from '../_models/followDetails';

@Injectable({ providedIn: 'root' })
export class LabelService {
    constructor(private http: HttpClient) { }

    getLabelDetails(id: number): Observable<LabelView> {
        return this.http.get<LabelView>(`${environment.url}/label/details/${id}`);
    }

    follow(id: number): Observable<any> {
        return this.http.get<LabelView>(`${environment.url}/follow/followLabel/${id}`);
    }

    getFollowedLabels(): Observable<FollowDetails[]> {
        return this.http.get<FollowDetails[]>(`${environment.url}/activity/followedLabels`);
    }

    unfollow(id: number): Observable<any> {
        return this.http.get<LabelView>(`${environment.url}/follow/unfollowLabel/${id}`);
    }
}