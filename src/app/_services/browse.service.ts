import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Browse } from '../_models/browse';
import { FilterCriterias } from '../_models/filterCriterias';
import { RecordDetails } from '../_models/recordDetails';

@Injectable({ providedIn: 'root' })
export class BrowseService {
    constructor(private http: HttpClient) { }

    getBrowseOptions(): Observable<Browse> {
        return this.http.get<Browse>(`${environment.url}/record/browse`);
    }

    getRecords(filterCriterias: FilterCriterias): Observable<RecordDetails[]> {
        return this.http.post<RecordDetails[]>(`${environment.url}/record/filter`, filterCriterias);
    }

}