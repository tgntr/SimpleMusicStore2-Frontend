import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../_helpers/base.component';
import { ArtistService } from '../_services/artist.service';
import { takeUntil } from 'rxjs/operators';
import { FollowDetails } from '../_models/followDetails';

@Component({
  selector: 'app-followed-artists',
  templateUrl: './followed-artists.component.html',
  styleUrls: ['./followed-artists.component.css']
})
export class FollowedArtistsComponent extends BaseComponent implements OnInit {
  followedArtists: FollowDetails[]

  constructor(private artistService: ArtistService) { super() }

  ngOnInit() {
    this.artistService.getFollowedArtists()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(followedArtists => this.followedArtists = followedArtists);
  }

  unfollow(index) {
    this.artistService.unfollow(this.followedArtists[index].id).subscribe(() => {
      this.followedArtists.splice(index, 1);
    })
  }

}