import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PriceList } from '../models/priceList.model';

@Injectable({ providedIn: 'root' })
export class PriceListService {
  private priceLists: PriceList[] = [];
  constructor(private http: HttpClient) {}
  GetPriceLists(searchPattern: string): Observable<any> {
    return this.http.get<PriceList[]>(`${environment.BASE_URL}priceList`); //making request without search pattern
  }
  // 2.	UpdatePriceList
}
