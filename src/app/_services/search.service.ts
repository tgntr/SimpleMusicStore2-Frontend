import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { SearchResult } from '../_models/searchResult';

@Injectable({ providedIn: 'root' })
export class SearchService {
    constructor(private http: HttpClient) { }

    search(term: string): Observable<SearchResult[]> {
        return this.http.get<SearchResult[]>(`${environment.url}/search/index?searchTerm=${term}`);
    }
}