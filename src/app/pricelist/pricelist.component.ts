import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { PriceList } from '../models/priceList.model';
import { PriceListService } from '../services/priceList.service';
import { ErpLogisticSiteService } from '../services/erpLogisticSiteService .service';
import { DetailEditComponent } from '../detail-edit/detail-edit.component';

@Component({
  selector: 'app-pricelist',
  templateUrl: './pricelist.component.html',
  styleUrls: ['./pricelist.component.css'],
})
export class PricelistComponent implements OnInit {
  priceListArr: PriceList[] = [];
  searchString: string = '';

  constructor(
    private pricelistService: PriceListService,
    private erpLogisticSiteService: ErpLogisticSiteService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.GetPriceList();
  }
  GetPriceList() {
    this.pricelistService.GetPriceLists('').subscribe((data) => {
      this.priceListArr = data.priceLists;
    });
  }
  onErpChange() {
    this.erpLogisticSiteService.erpChangeEvent.emit(2); //don't know what excatly we want to implement with this event
    this.GetPriceList();
  }
  EditPriceList(priceListId: number) {
    console.log(this.priceListArr.find((x) => x.priceListID === priceListId));
    this.openDialog();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DetailEditComponent, {
      width: '250px',
    });
  }
}
