import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { AuthGuard } from './_helpers/auth-guard';
import { AddRecordComponent } from './add-record/add-record.component';

const routes: Routes = [
  
  { path: '', component: NewsfeedComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'add-record', component: AddRecordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
