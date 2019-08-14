import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { takeUntil, catchError } from 'rxjs/operators';
import { BaseComponent } from '../_helpers/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from '../_services/artist.service';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.css']
})
export class ArtistDetailsComponent extends BaseComponent implements OnInit {
  artist;

  constructor(private route: ActivatedRoute, private router: Router, private artistService: ArtistService) { super() }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.artistService.getArtistDetails(id)
      .pipe(
        takeUntil(this.unsubscribe),
        catchError(error => this.router.navigate(['/'])))
      .subscribe(artist => {
        this.artist = artist;
      });
  }

  addToWishlist() {
    this.artistService.follow(this.artist.id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => this.artist.isFollowed = true);
  }

  removeFromWishlist() {
    this.artistService.unfollow(this.artist.id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => this.artist.isFollowed = false);
  }
}
