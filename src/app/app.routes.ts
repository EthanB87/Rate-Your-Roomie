import { Routes } from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {AddReviewComponent} from "./pages/add-review/add-review.component";
import {AllUsersComponent} from "./pages/all-users/all-users.component";
import {SearchComponent} from "./pages/search/search.component";
import {NewUserComponent} from "./pages/new-user/new-user.component";

export const routes: Routes = [
  {path: "home", component: HomePageComponent},
  {path: "add", component: AddReviewComponent},
  {path: "all/:id", component: AllUsersComponent},
  {path: "", redirectTo: 'search', pathMatch: "full"},
  {path: "search", component: SearchComponent},
  {path: "new", component: NewUserComponent},
];
