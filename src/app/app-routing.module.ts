import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { AuthGuard } from './_helpers/auth-guard';
import { AddRecordComponent } from './add-record/add-record.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrderComponent } from './order/order.component';
import { NotAuthenticated } from './_helpers/not-authenticated';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { BrowseComponent } from './browse/browse.component';
import { RecordDetailsComponent } from './record-details/record-details.component';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';
import { LabelDetailsComponent } from './label-details/label-details.component';

const routes: Routes = [
  { path: '', component: NewsfeedComponent },
  { path: 'auth', component: AuthComponent, canActivate: [NotAuthenticated] },
  { path: 'add-record', component: AddRecordComponent, canActivate: [AuthGuard] },
  { path: 'order', component: OrderComponent },
  { path: 'my-profile', component: MyProfileComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'record/:id', component: RecordDetailsComponent },
  { path: 'artist/:id', component: ArtistDetailsComponent },
  { path: 'label/:id', component: LabelDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
