import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingShowService} from "../../services/loading-show.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public inputSearch: string = '';

  constructor(private loadingShowService: LoadingShowService,
              private activatedRoute: ActivatedRoute) {
  }

  public loadingChange(): void {
    this.loadingShowService.loaderVisible();
  }

  ngOnInit() {
    this.activatedRoute.queryParams
      .subscribe((params) => {
        this.inputSearch = params['search'];
      })
  }

  public ngOnDestroy(): void {
    this.loadingShowService.loaderHide();
  }
}
