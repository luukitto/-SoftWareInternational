import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {ProductService} from "../../services/product.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productService.getProductById(id).subscribe(product => {
        this.productForm.patchValue(product);
      });
    }
  }

  async onSubmit(): Promise<void> {
    if (this.productForm.valid) {
      if (this.isEditMode) {
        await firstValueFrom(this.productService.updateProduct({
          id: this.route.snapshot.paramMap.get('id'),
          ...this.productForm.value
        }));
      } else {
        await firstValueFrom(this.productService.addProduct(this.productForm.value));
      }
      await this.router.navigate(['/product']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/product'])
  }
}
