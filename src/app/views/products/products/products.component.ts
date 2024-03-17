import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../../shared/services/data.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProductType} from "../../../../types/product.type";
import {mergeMap, Observable, Subscription, tap} from "rxjs";
import {LoadingShowService} from "../../../shared/services/loading-show.service";

@Component({
  selector: 'products-component',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: ProductType[] = [];
  private subs: Subscription = new Subscription();
  public loaderState: boolean = false;

  title: string = 'Наши чайные коллекции';

  constructor(private dataService: DataService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private loadingShowService: LoadingShowService) {
  }

  ngOnInit(): void {
    this.initLoader();
    this.initProducts();
  }

  ngOnDestroy() {
    this.subs?.unsubscribe();
  }

  private initLoader(): void {
    this.subs.add(this.loadingShowService.getLoaderState()
      .subscribe(
        (loaderState: boolean): void => {
          this.loaderState = loaderState
        }));
  }

  private initProducts(): void {
    let searchParams: string = '';

    this.subs.add(this.activatedRoute.queryParams
      .pipe(
        mergeMap((params: Params): Observable<ProductType[]> => {
          this.loadingShowService.loaderVisible();
          searchParams = '';

          if (params['search']) {
            searchParams = params['search'];
          }
          return this.dataService.getProducts(searchParams);
        }),

        tap(() => {
          this.loadingShowService.loaderHide()
          this.products = [];
        })
      )
      .subscribe({
        next: (data: ProductType[]): void => {

          if (searchParams) {
            if (data.length === 0) {
              this.title = 'Ничего не найдено';
            } else {
              this.title = 'Результаты поиска по запросу ' + '"' + searchParams + '"';
            }
          } else {
            this.title = 'Наши чайные коллекции';
          }

          this.products = data;

        },

        error: (error): void => {
          console.log(error);
          this.router.navigate(['/']);
        },
        complete: () => this.loadingShowService.loaderHide()
      }))
  }

}
