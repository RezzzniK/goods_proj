import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PriceList } from '../models/priceList.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PriceListService } from '../services/priceList.service';
@Component({
  selector: 'app-detail-edit',
  templateUrl: './detail-edit.component.html',
  styleUrls: ['./detail-edit.component.css'],
})
export class DetailEditComponent implements OnInit {
  priceList2Edit: PriceList;
  priceLists: PriceList[] = [];
  editForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PriceList,
    private priceListService: PriceListService
  ) {}

  ngOnInit(): void {
    this.priceList2Edit = this.data[0];
    this.priceLists = [...this.data[1]];
    this.editForm = new FormGroup({
      priceListName: new FormControl(this.priceList2Edit.priceListName, [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern(/^[a-zA-Zs]*$/),
      ]),
      extErpPriceListID: new FormControl(
        this.priceList2Edit.extErpPriceListID,
        [
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
          this.forbiddenExtID.bind(this),
        ]
      ),
    });
  }
  forbiddenExtID(control: FormControl): { [s: string]: boolean } {
    if (
      this.priceLists.find(
        (x) =>
          x.extErpPriceListID === Number(control.value) ||
          x.priceListID === Number(control.value)
      )
    ) {
      return { 'ExtErpPriceListID is taken': true };
    } else {
      return null; //if validation is successfull we should pass nothing to validator
    }
  }

  onSubmit() {
    this.priceList2Edit.priceListName =
      this.editForm.get('priceListName').value;
    this.priceList2Edit.extErpPriceListID = Number(
      this.editForm.get('extErpPriceListID').value
    );
    this.priceListService.UpdatePriceList(this.priceList2Edit);
  }
}
