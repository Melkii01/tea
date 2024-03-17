import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {delay, map, mergeMap, Observable, timer} from "rxjs";
import {ProductType} from "../../../types/product.type";
import {OrderResponse} from "../../../types/order-response";
import {environment} from "../../../environments/environment";

type ProductSearchType = Record<number, ProductType>;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  getProducts(searchParams: string): Observable<ProductType[]> {

    let params: HttpParams = new HttpParams();
    if (searchParams) {
      params = params.append('search', searchParams);
    }

    return this.http
      .get<ProductType[] | ProductSearchType>(environment.apiUrl + '/tea', {params})
      .pipe(
        delay(500),
        map((response: ProductType[] | ProductSearchType): ProductType[] => {
          if (Array.isArray(response)) {
            return response;
          }

          return Object.values(response);
        })
      );
  }

  getProduct(id: string): Observable<ProductType> {
    return this.http
      .get<ProductType>(environment.apiUrl + '/tea?id=' + id)
      .pipe(delay(500));
  }

  createOrder(data: OrderResponse) {
    return timer(500).pipe(
      mergeMap(() => this.http.post<{ success: boolean, message?: string }>(environment.apiUrl + '/order-tea', data))
    );
  }
}
