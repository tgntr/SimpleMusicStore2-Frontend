import { Component, OnInit } from '@angular/core';
import { Newsfeed } from '../_models/newsfeed';
import { NewsfeedService } from '../_services/newsfeed.service';
import { AuthService } from 'angularx-social-login';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { Router } from '@angular/router';
import { BaseComponent } from '../_helpers/base.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent extends BaseComponent implements OnInit {
  loading = false;
  newsfeed: Newsfeed;
  isAuthenticated = false;

  constructor(
    private newsfeedService: NewsfeedService,
    private authService: AuthService) { super(); }

  ngOnInit() {
    this.loading = true;
    this.authService.authState.pipe(takeUntil(this.unsubscribe)).subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
      }
    });
    this.newsfeedService.getNewsfeed().pipe(takeUntil(this.unsubscribe)).subscribe(newsfeed => {
      this.newsfeed = newsfeed;
      this.loading = false;
    });
  }
}
