import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {DataService} from "../../../shared/services/data.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {mergeMap, Observable, Subscription, tap} from "rxjs";
import {LoadingShowService} from "../../../shared/services/loading-show.service";

@Component({
  selector: 'product-component',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  product!: ProductType;
  private subs: Subscription = new Subscription();

  constructor(private dataService: DataService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private loadingShowService: LoadingShowService) {
  }

  ngOnInit(): void {
    this.initProducts();
  }

  ngOnDestroy() {
    this.subs?.unsubscribe();
  }

  private initProducts(): void {
    let searchId: string = '';

    this.subs.add(this.activatedRoute.params
      .pipe(
        mergeMap((params: Params): Observable<ProductType> => {
          this.loadingShowService.loaderVisible();
          searchId = '';

          const urlId = params['id'];
          if (urlId) {
            searchId = urlId;
          }

          return this.dataService.getProduct(searchId);
        }),

        tap(() => {
          this.loadingShowService.loaderHide()
        })
      )
      .subscribe({
        next: (data: ProductType): void => {
          if (data) {
            this.product = data
          } else {
            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          this.router.navigate(['/']);
        },
        complete: () => this.loadingShowService.loaderHide(),
      }))
  }
}
