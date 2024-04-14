import { Routes } from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {AddReviewComponent} from "./pages/add-review/add-review.component";
import {AllUsersComponent} from "./pages/all-users/all-users.component";
import {NewUserComponent} from "./pages/new-user/new-user.component";
import {LoginComponent} from "./pages/login/login.component";
import {AllReviewsComponent} from "./pages/all-reviews/all-reviews.component";
import {UserDetailsComponent} from "./pages/user-details/user-details.component";

export const routes: Routes = [
  {path: "home", component: HomePageComponent},
  {path: "add/:id", component: AddReviewComponent},
  {path: "all", component: AllUsersComponent},
  {path: "", redirectTo: 'login', pathMatch: "full"},
  {path: "new", component: NewUserComponent},
  {path: "login", component: LoginComponent},
  {path: "reviews/:id", component: AllReviewsComponent},
  {path: "details/:id", component: UserDetailsComponent}
];
