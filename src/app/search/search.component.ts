import { Component, OnInit } from '@angular/core';
import { SearchResult } from '../_models/searchResult';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { SearchService } from '../_services/search.service';
import { BaseComponent } from '../_helpers/base.component';
import { debounceTime, map, takeUntil, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent extends BaseComponent implements OnInit {

  results: SearchResult[] = [];
  searchForm: FormGroup;
  loading = false;

  constructor(private formBuilder: FormBuilder, private searchService: SearchService, private router: Router) {
    super();
    this.searchForm = this.formBuilder.group({
      searchTerm: ['']
    });
  }

  ngOnInit() {
    this.searchForm.controls.searchTerm.valueChanges
      .pipe(
        debounceTime(520),
        distinctUntilChanged(),
        filter(term => {
          term = term.trim();
          if (!term) {
            this.results = [];
            this.loading = false;
          }
          return term;
        }),
        switchMap(term => this.searchService.search(term.trim())))
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(result => {
        this.results = result;
        this.loading = false;
      })
  };

  redirectToDetailsView(result: SearchResult) {
    this.searchForm.controls.searchTerm.setValue('');
    this.results = [];
    this.router.navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([`/${result.contentType.toLowerCase()}/${result.id}`]));
  }
}
