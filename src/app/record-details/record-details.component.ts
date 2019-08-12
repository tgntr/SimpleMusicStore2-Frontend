import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordService } from '../_services/record.service';
import { RecordView } from '../_models/recordView';
import { BaseComponent } from '../_helpers/base.component';
import { takeUntil, catchError } from 'rxjs/operators';
import { TrackDetails } from '../_models/trackDetails';

@Component({
  selector: 'app-record-details',
  templateUrl: './record-details.component.html',
  styleUrls: ['./record-details.component.css']
})
export class RecordDetailsComponent extends BaseComponent implements OnInit {
  record;
  selectedTrack: TrackDetails;

  constructor(private route: ActivatedRoute, private recordService: RecordService, private router: Router) { super() }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.recordService.getRecordDetails(id)
      .pipe(
        takeUntil(this.unsubscribe),
        catchError(error => this.router.navigate(['/'])))
      .subscribe(record => {
        this.record = record;
        console.log(record);
      });
  }

  addToWishlist() {
    this.recordService.addToWishlist(this.record.id).pipe(takeUntil(this.unsubscribe)).subscribe(()=>this.record.isInWishlist=true);
  }
  
  removeFromWishlist() {
    this.recordService.removeFromWishlist(this.record.id).pipe(takeUntil(this.unsubscribe)).subscribe(()=>this.record.isInWishlist=false);
  }
}
