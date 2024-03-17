import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {LoadingShowService} from "../../services/loading-show.service";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {
  public loaderState: boolean = false;
  private subs: Subscription = new Subscription();

  constructor(private loadingShowService: LoadingShowService) {
  }

  public ngOnInit() {
    this.subs
      .add(this.loadingShowService.getLoaderState()
        .subscribe(
          (loaderState: boolean): void => {
            this.loaderState = loaderState
          }));
  }

  public ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
