import { Component, OnInit } from '@angular/core';
import { Newsfeed } from '../_models/newsfeed';
import { NewsfeedService } from '../_services/newsfeed.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {
  loading = false;
  newsfeed: Newsfeed;

  constructor(private newsfeedService: NewsfeedService) { }

  ngOnInit() {
    this.loading = true;
    this.newsfeedService.getNewsfeed().subscribe(newsfeed => {
        this.newsfeed = newsfeed;
        this.loading = false;
    });
  }
}
