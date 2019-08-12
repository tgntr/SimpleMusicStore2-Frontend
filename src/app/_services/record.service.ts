import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Newsfeed } from '../_models/newsfeed';
import { NewRecord } from '../_models/new-record/newRecord';
import { RecordView } from '../_models/recordView';
import { RecordDetails } from '../_models/recordDetails';

@Injectable({ providedIn: 'root' })
export class RecordService {
    constructor(private http: HttpClient) { }

    extractRecordInformation(discogsUrl: string): Observable<NewRecord> {
        return this.http.get<NewRecord>(`${environment.url}/discogs/find?url=${discogsUrl}`);
    }

    addRecord(record: NewRecord): Observable<any> {
        return this.http.post(`${environment.url}/record/add`, record);
    }

    upload(file: FormData, fileName: string): Observable<any> {
        return this.http.post(`${environment.url}/preview/upload?fileName=${fileName}`, file);
    }

    getRecordDetails(id: number): Observable<RecordView> {
        return this.http.get<RecordView>(`${environment.url}/record/details/${id}`);
    }

    getWishlist(): Observable<RecordDetails[]> {
        return this.http.get<RecordDetails[]>(`${environment.url}/activity/wishlist`);
    }

    addToWishlist(id: number): Observable<any> {
        return this.http.get(`${environment.url}/follow/addtowishlist/${id}`);
    }

    removeFromWishlist(id: number): Observable<any> {
        return this.http.get(`${environment.url}/follow/removefromwishlist/${id}`);
    }
}