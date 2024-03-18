import {Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {WasInMainPageService} from "../../../shared/services/was-in-main-page.service";
import {Observable, Subject, Subscription} from "rxjs";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {TeaModalComponent} from "../../../shared/components/tea-modal/tea-modal.component";

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  public observable: Observable<boolean>;
  private subs: Subscription = new Subscription();
  private modal!: NgbModalRef;

  constructor(public wasInMainPageService: WasInMainPageService,
              private ngbModal: NgbModal) {

    this.observable = new Observable((observer) => {

      const timeout = setTimeout((): void => {
        this.modal = this.ngbModal.open(TeaModalComponent);
      }, 1000)

      return {
        unsubscribe(): void {
          clearInterval(timeout);
        }
      }
    })
  }

  ngOnInit(): void {
    if (!this.wasInMainPageService.getWasInMainPage()) {
      this.wasInMainPageService.setWasInMainPage(true);
      this.subs.add(this.observable.subscribe());
    }
  }

  ngOnDestroy() {
    this.modal.close();
    this.subs?.unsubscribe();
  }

}
