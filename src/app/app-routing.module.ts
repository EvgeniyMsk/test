import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from "./components/profile/profile.component";
import {AuthGuardService} from "./helper/auth-guard.service";

const routes: Routes = [
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
