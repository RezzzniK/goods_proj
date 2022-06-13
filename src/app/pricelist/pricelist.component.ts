import { Component, EventEmitter, OnInit } from '@angular/core';
import { PriceList } from '../models/priceList.model';
import { PriceListService } from '../services/priceList.service';
import { NgModel } from '@angular/forms';
import { ErpLogisticSiteService } from '../services/erpLogisticSiteService .service';

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
    private erpLogisticSiteService: ErpLogisticSiteService
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
}
