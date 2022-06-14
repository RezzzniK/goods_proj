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
  priceList2Edit: PriceList;//variable that we get from priceList component
  priceLists: PriceList[] = [];//array of price lists that we getting from the priclist comp
  editForm: FormGroup;//variable to mangae our reactive form
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PriceList/*this service is getting access to data from pricelist component */,
    private priceListService: PriceListService//pricelist service to handle update service
  ) {}

  ngOnInit(): void {
    this.priceList2Edit = this.data[0];
    this.priceLists = [...this.data[1]];
    this.editForm = new FormGroup({//creating form group & form controls & validators
      priceListName: new FormControl(this.priceList2Edit.priceListName, [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern(/^[a-zA-Zs]*$/),
      ]),
      extErpPriceListID: new FormControl(
        this.priceList2Edit.extErpPriceListID,
        [
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
          this.forbiddenExtID.bind(this),//custom validator
        ]
      ),
    });
  }
  forbiddenExtID(control: FormControl): { [s: string]: boolean } {//custom validator
    if (
      this.priceLists.find(//searching for occurences of Id's
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

  onSubmit() {//submit fucntion that activating our update service and closes dialog window
    this.priceList2Edit.priceListName =
      this.editForm.get('priceListName').value;
    this.priceList2Edit.extErpPriceListID = Number(
      this.editForm.get('extErpPriceListID').value
    );
    this.priceListService.UpdatePriceList(this.priceList2Edit);
  }
}
