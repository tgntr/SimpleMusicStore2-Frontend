import { Component, OnInit } from '@angular/core';
import { Browse } from '../_models/browse';
import { BrowseService } from '../_services/browse.service';
import { FilterCriterias } from '../_models/filterCriterias';
import { BaseComponent } from '../_helpers/base.component';
import { takeUntil } from 'rxjs/operators';
import { RecordDetails } from '../_models/recordDetails';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent extends BaseComponent implements OnInit {

  browseOptions: Browse;
  filters: FilterCriterias = new FilterCriterias();
  records: RecordDetails[];

  constructor(private browseService: BrowseService) { super(); }

  ngOnInit() {
    this.browseService.getBrowseOptions().pipe(takeUntil(this.unsubscribe)).subscribe(browse=> {
      this.browseOptions = browse;
      console.log(browse);
    });
    this.browseService.getRecords(this.filters).pipe(takeUntil(this.unsubscribe)).subscribe(records=> {
      this.records = records;
    });
  }
  
  addGenreToFilters(event){
    if (event.target.checked) {
      this.filters.genres.push(event.target.value);
    } else {
      this.filters.genres.splice(this.filters.genres.indexOf(event.target.value), 1);
    }
  }

  addFormatToFilters(event){
    if (event.target.checked) {
      this.filters.formats.push(event.target.value);
    } else {
      this.filters.formats.splice(this.filters.formats.indexOf(event.target.value), 1);
    }
  }

  onSubmit() {
    this.browseService.getRecords(this.filters).pipe(takeUntil(this.unsubscribe)).subscribe(records=> {
      this.records = records;
    })
  }
}
