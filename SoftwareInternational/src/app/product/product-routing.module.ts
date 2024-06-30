import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import {ProductFormComponent} from "./product-form/product-form.component";
import {ProductListComponent} from "./product-list/product-list.component";
import {AuthGuard} from "../services/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ProductListComponent },
      { path: 'add', component: ProductFormComponent },
      { path: 'edit/:id', component: ProductFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
