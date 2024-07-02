import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import {SalesManagersService} from "./sales-managers.service";

@Injectable({
  providedIn: 'root'
})
export class SalesManagerResolver implements Resolve<any> {
  constructor(private salesManagerService: SalesManagersService) {}

  resolve() {
    return this.salesManagerService.getSalesManagers();
  }
}
