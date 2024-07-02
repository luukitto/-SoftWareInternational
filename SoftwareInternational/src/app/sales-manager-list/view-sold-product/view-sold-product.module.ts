import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewSoldProductComponent } from "./view-sold-product.component";
import { MatButton } from "@angular/material/button";

@NgModule({
  declarations: [ViewSoldProductComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButton,
  ],
  exports: [ViewSoldProductComponent]
})
export class SoldProductsPopupModule { }
