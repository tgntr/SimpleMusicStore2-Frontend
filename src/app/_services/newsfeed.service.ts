import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Newsfeed } from '../_models/newsfeed';

@Injectable({ providedIn: 'root' })
export class NewsfeedService {
    constructor(private http: HttpClient) { }

    getNewsfeed(): Observable<Newsfeed>{
        return this.http.get<Newsfeed>(`${environment.url}/home/index`);
    }
}