import { Component, OnInit } from '@angular/core';
import { PriceList } from '../models/priceList.model';
import { PriceListService } from '../services/priceList.service';

@Component({
  selector: 'app-pricelist',
  templateUrl: './pricelist.component.html',
  styleUrls: ['./pricelist.component.css'],
})
export class PricelistComponent implements OnInit {
  priceListArr: PriceList[] = [];
  constructor(private pricelistService: PriceListService) {}

  ngOnInit(): void {
    this.pricelistService.GetPriceLists('').subscribe((data) => {
      this.priceListArr = [...data.priceLists];
    });
  }
}
