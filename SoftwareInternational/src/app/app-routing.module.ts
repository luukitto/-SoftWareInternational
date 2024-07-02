import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./services/auth.guard";
import { SalesManagerResolver } from "./services/sales-manager.resolver";
import {SalesManagerListComponent} from "./sales-manager-list/sales-manager-list.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard] },
  { path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
  { path: 'sales-managers', component: SalesManagerListComponent, resolve: { salesManagers: SalesManagerResolver }, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
