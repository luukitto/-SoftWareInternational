import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {SalesManagersService} from "../services/sales-managers.service";
import {MatDialog} from "@angular/material/dialog";
import {SalesManagesRegistrationComponent} from "./sales-manages-registration/sales-manages-registration.component";
import {ViewSoldProductComponent} from "./view-sold-product/view-sold-product.component";
import {AddSalePopupComponent} from "./add-sale-popup/add-sale-popup.component";

@Component({
  selector: 'app-sales-manager-list',
  templateUrl: './sales-manager-list.component.html',
  styleUrl: './sales-manager-list.component.css',
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition(':enter, :leave', [
        animate(300)
      ])
    ])
  ]
})
export class SalesManagerListComponent implements OnInit{
  salesManagers: any[] = [];
  filterForm: FormGroup;
  displayedColumns: string[] = ['username', 'firstName', 'lastName', 'registrationDate', 'totalSales', 'actions'];

  constructor(
    private fb: FormBuilder,
    private salesManagerService: SalesManagersService,
    private dialog: MatDialog
  ) {
    this.filterForm = this.fb.group({
      username: [''],
      firstName: [''],
      lastName: [''],
      registrationDateStart: [''],
      registrationDateEnd: [''],
      totalSalesMin: [''],
      totalSalesMax: [''],
    });
  }

  ngOnInit(): void {
    this.getSalesManagers();
  }

  getSalesManagers(): void {
    this.salesManagerService.getSalesManagers().subscribe((managers: { [key: string]: any }) => {
      this.salesManagers = Object.keys(managers).map(key => ({ id: key, ...managers[key] }));
    });
  }

  applyFilter(): void {
    const filterValues = this.filterForm.value;
    this.salesManagerService.getFilteredSalesManagers(filterValues).subscribe((managers: { [key: string]: any }) => {
      this.salesManagers = Object.keys(managers).map(key => ({ id: key, ...managers[key] }));
    });
  }

  openRegistrationPopup(): void {
    const dialogRef = this.dialog.open(SalesManagesRegistrationComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getSalesManagers();
      }
    });
  }

  viewSoldProducts(manager: any): void {
    this.dialog.open(ViewSoldProductComponent, {
      width: '600px',
      data: { soldProducts: manager.soldProducts || [] }
    });
  }
}
