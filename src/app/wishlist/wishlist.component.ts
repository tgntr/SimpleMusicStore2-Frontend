import { Component, OnInit } from '@angular/core';
import { RecordService } from '../_services/record.service';
import { RecordDetails } from '../_models/recordDetails';
import { BaseComponent } from '../_helpers/base.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent extends BaseComponent implements OnInit {
  wishlist: RecordDetails[];
  page: number = 1;

  constructor(private recordService: RecordService) { super() }

  ngOnInit() {
    this.recordService.getWishlist(this.page).pipe(takeUntil(this.unsubscribe)).subscribe(wishlist => this.wishlist = wishlist);
  }

  removeFromWishlist(index) {
    this.recordService.removeFromWishlist(this.wishlist[index].id).subscribe(() => {
      this.wishlist.splice(index, 1);
    })
  }

  onScroll() {
    this.page++;
    this.recordService.getWishlist(this.page).pipe(takeUntil(this.unsubscribe)).subscribe(wishlist => this.wishlist = this.wishlist.concat(wishlist));
  }
}
