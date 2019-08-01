import { Component, OnInit } from '@angular/core';
import { Newsfeed } from '../_models/newsfeed';
import { NewsfeedService } from '../_services/newsfeed.service';
import { AuthService } from 'angularx-social-login';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {
  loading = false;
  newsfeed: Newsfeed;
  isAuthenticated = false;

  constructor(
    private newsfeedService: NewsfeedService, 
    private authService: AuthService, 
    private shoppingCartService: ShoppingCartService, 
    private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.authService.authState.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
      }
    });
    this.newsfeedService.getNewsfeed().subscribe(newsfeed => {
        this.newsfeed = newsfeed;
        this.loading = false;
    });
  }

  addToCart(recordId: number) {
    this.shoppingCartService.addToCart(recordId).subscribe(()=>this.router.navigate(['/shopping-cart']));
  }
}
