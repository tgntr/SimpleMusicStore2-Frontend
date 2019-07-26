import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Newsfeed } from '../_models/newsfeed';
import { NewRecord } from '../_models/new-record/newRecord';

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
        debugger;
        
        return this.http.post(`${environment.url}/preview/upload?fileName=${fileName}`, file);
    }
}