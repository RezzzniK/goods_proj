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
  searchString: string = ''; //STRING FOR DYNAMIC SEARCHING IN TABLE

  constructor(
    private pricelistService: PriceListService, //SERVICE FOR REQUESTS
    private erpLogisticSiteService: ErpLogisticSiteService, //YOU ASKED FOR THIS SERVICE)
    public dialog: MatDialog //DEIALOG SERVICE TO OPEN EDIT FORM WITH COMPONENT INSIDE
  ) {}

  ngOnInit(): void {
    this.GetPriceList(); //GET TABLE OF PRICELISTS ON COMPONENT CREATION
  }
  GetPriceList() {
    this.pricelistService.GetPriceLists().subscribe((data) => {
      //SUBSCRIBING FOR DATA FROM SERVICE
      this.priceListArr = data.priceLists;
    });
  }
  onErpChange() {
    console.log('in erpChange');
    this.erpLogisticSiteService.erpChangeEvent.emit(2); //don't know what excatly we want to implement with this event
    this.GetPriceList();
  }
  EditPriceList(priceListId: number) {
    //FUNCTION FOR CALLING DETAIL EDIT COMPONENT
    this.openDialog(
      //PASSING THE OBJECT THAT WE INTRESTING IN EDITING
      this.priceListArr.find((x) => x.priceListID === priceListId)
    );
  }
  openDialog(priceList: PriceList | undefined): void {
    if (priceList !== undefined) {
      const dialogRef = this.dialog.open(DetailEditComponent, {
        width: '350px',
        data: [priceList, this.priceListArr], //WITH OPENING DIALOG WINDOW WE CAN PASS INSIDE ALSO DATA
      });
    }
  }
}
