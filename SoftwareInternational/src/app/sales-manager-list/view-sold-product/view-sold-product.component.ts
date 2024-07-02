import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-view-sold-product',
  templateUrl: './view-sold-product.component.html',
  styleUrl: './view-sold-product.component.css'
})
export class ViewSoldProductComponent {
  soldProducts: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<ViewSoldProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.soldProducts = data.soldProducts ? Object.values(data.soldProducts) : [];
    console.log(this.soldProducts, 'data')
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
