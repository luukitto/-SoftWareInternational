import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SalesManagersService} from "../../services/sales-managers.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-sale-popup',
  templateUrl: './add-sale-popup.component.html',
  styleUrl: './add-sale-popup.component.css'
})
export class AddSalePopupComponent {
  saleForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private salesManagerService: SalesManagersService,
    public dialogRef: MatDialogRef<AddSalePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.saleForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.saleForm.valid) {
      this.salesManagerService.addSale(this.data.userId, this.saleForm.value).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
