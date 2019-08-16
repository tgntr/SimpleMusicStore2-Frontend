import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SocialLoginModule, AuthServiceConfig, AuthService } from "angularx-social-login";
import { AuthComponent } from './auth/auth.component';
import { authServiceConfig } from './socialLoginConfig';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor,  } from './_helpers/jwt-interceptor';
import { ErrorInterceptor } from './_helpers/error-interceptor';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { AddRecordComponent } from './add-record/add-record.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrderComponent } from './order/order.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { CheckoutComponent } from './checkout/checkout.component';
import { BrowseComponent } from './browse/browse.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { RecordDetailsComponent } from './record-details/record-details.component';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecordComponent } from './record/record.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { SearchComponent } from './search/search.component';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';
import { DiscographyComponent } from './discography/discography.component';
import { LabelDetailsComponent } from './label-details/label-details.component';
import { FollowedArtistsComponent } from './followed-artists/followed-artists.component';
import { FollowedLabelsComponent } from './followed-labels/followed-labels.component';
import { AddressesComponent } from './addresses/addresses.component';
import { CookieService } from 'ngx-cookie-service';




@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AuthComponent,
    NewsfeedComponent,
    AddRecordComponent,
    ShoppingCartComponent,
    OrderComponent,
    MyProfileComponent,
    AllOrdersComponent,
    CheckoutComponent,
    BrowseComponent,
    AddToCartComponent,
    RecordDetailsComponent,
    AudioPlayerComponent,
    RecordComponent,
    WishlistComponent,
    SearchComponent,
    ArtistDetailsComponent,
    DiscographyComponent,
    LabelDetailsComponent,
    FollowedArtistsComponent,
    FollowedLabelsComponent,
    AddressesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxAudioPlayerModule,BrowserAnimationsModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: authServiceConfig
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    DatePipe,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
