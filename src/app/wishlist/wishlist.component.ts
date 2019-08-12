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
  wishlist: RecordDetails[]

  constructor(private recordService: RecordService) { super() }

  ngOnInit() {
    this.recordService.getWishlist().pipe(takeUntil(this.unsubscribe)).subscribe(wishlist => this.wishlist = wishlist);
  }

  removeFromWishlist(index) {
    this.recordService.removeFromWishlist(this.wishlist[index].id).subscribe(()=> {
      this.wishlist.splice(index, 1);
    })
  }

}
