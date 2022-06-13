import { EventEmitter, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ErpLogisticSiteService {
  ERPCompanyIds: number[] = [];
  erpChangeEvent: EventEmitter<any> = new EventEmitter<number>();
  getErps(): number[] {
    return this.ERPCompanyIds;
  }
}
