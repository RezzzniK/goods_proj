import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PriceList } from '../models/priceList.model';

@Injectable({ providedIn: 'root' })
export class PriceListService {
  constructor(private http: HttpClient, private toastr: ToastrService) {}
  //GET METHOD
  GetPriceLists(): Observable<any> {
    try{
    return this.http.get<PriceList[]>(`${environment.BASE_URL}priceList`); //making request
    }
    catch(error){
      this.toastr.error(error)
      return null;
    }
  }

  //PUT METHOD
  UpdatePriceList(priceList: PriceList): Observable<any> {
    try {
      return this.http.put<any>(`${environment.BASE_URL}priceList`, {
        priceList,
      });
    } catch (error) {
      this.toastr.error(error);
      return null;
    }
  }
}
