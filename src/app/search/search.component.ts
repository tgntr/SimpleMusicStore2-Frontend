import { Component, OnInit } from '@angular/core';
import { SearchResult } from '../_models/searchResult';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { SearchService } from '../_services/search.service';
import { BaseComponent } from '../_helpers/base.component';
import { debounceTime, map, takeUntil, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent extends BaseComponent implements OnInit {

  results: SearchResult[] = [];
  searchForm: FormGroup;
  loading = false;

  constructor(private formBuilder: FormBuilder, private searchService: SearchService) {
    super();
    this.searchForm = this.formBuilder.group({
      searchTerm: ['']
    });
  }

  ngOnInit() {
    this.searchForm.controls.searchTerm.valueChanges
      .pipe(
        debounceTime(600),
        distinctUntilChanged(),
        filter(term => {
          term = term.trim();
          if (!term) {
            this.results = [];
          } else {
            this.loading = true;
          }
          return term;
        }),
        switchMap(term => this.searchService.search(term.trim())))
      .subscribe(result => {
        this.results = result;
        this.loading = false;
      })
  };


}
