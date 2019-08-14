import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../_helpers/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from '../_services/artist.service';
import { takeUntil, catchError } from 'rxjs/operators';
import { LabelService } from '../_services/label.service';

@Component({
  selector: 'app-label-details',
  templateUrl: './label-details.component.html',
  styleUrls: ['./label-details.component.css']
})
export class LabelDetailsComponent extends BaseComponent implements OnInit {
  label;

  constructor(private route: ActivatedRoute, private router: Router, private labelService: LabelService) { super() }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.labelService.getLabelDetails(id)
      .pipe(
        takeUntil(this.unsubscribe),
        catchError(error => this.router.navigate(['/'])))
      .subscribe(label => {
        this.label = label;
      });
  }

  addToWishlist() {
    this.labelService.follow(this.label.id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => this.label.isFollowed = true);
  }

  removeFromWishlist() {
    this.labelService.unfollow(this.label.id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => this.label.isFollowed = false);
  }
}

