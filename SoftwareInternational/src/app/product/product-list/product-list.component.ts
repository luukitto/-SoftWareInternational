import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements  OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'price','quantity','actions'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.getProducts();

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


  editProduct(id: string): void {
    this.router.navigate(['/product/edit', id]);
  }

  deleteProduct(id: string): void {

  }
}
