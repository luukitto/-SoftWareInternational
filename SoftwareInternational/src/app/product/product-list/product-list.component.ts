import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";
import {SalesManagersService} from "../../services/sales-managers.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements  OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'price','quantity','sell','sold','actions'];
  dataSource = new MatTableDataSource<any>();
  currentUser: any

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private salesManagersService: SalesManagersService,
    private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.getProducts();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      (products: any) => {
        console.log('Products:', products); // Log the products to check the response
        const transformedProducts = Object.keys(products).map(key => ({
          id: key,
          ...products[key]
        }));
        console.log('Transformed Products:', transformedProducts); // Log the transformed products
        this.dataSource.data = transformedProducts;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sellProduct(productId: string, quantity: any): void {
    if (quantity <= 0) {
      alert("Please enter a valid quantity to sell.");
      return;
    }

    this.productService.getProductById(productId).subscribe(product => {
      const updatedQuantity = product.quantity - quantity;
      if (updatedQuantity < 0) {
        alert("Not enough stock available.");
        return;
      }

      this.productService.updateProduct({ ...product, quantity: updatedQuantity }).subscribe(() => {
        this.salesManagersService.addSale(this.currentUser.sub, { name: product.name, price: product.price, quantity: quantity }).subscribe(() => {
          this.getProducts();
        });
      });
    });
  }



  editProduct(id: string): void {
    this.router.navigate(['/product/edit', id]);
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.getProducts();
    });
  }
}
