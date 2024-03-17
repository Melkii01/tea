import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {WasInMainPageService} from "../../shared/services/was-in-main-page.service";
import {Observable} from "rxjs";
import {Modal} from 'bootstrap';

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  public observable: Observable<boolean>;
  @ViewChild('modal', {static: true}) private modalElementRef!: ElementRef<HTMLDivElement>;
  private modal!: Modal;

  constructor(public wasInMainPageService: WasInMainPageService) {

    this.observable = new Observable((observer) => {

      const timeout = setTimeout(() => {
        this.modal = new Modal(this.modalElementRef.nativeElement);
        this.modal.show();
      }, 1000)

      return {
        unsubscribe() {
          clearInterval(timeout);
        }
      }
    })
  }

  ngOnInit(): void {
    if (!this.wasInMainPageService.getWasInMainPage()) {
      this.wasInMainPageService.setWasInMainPage(true);
      this.observable.subscribe();
    }
  }

  ngOnDestroy() {
    this.modal?.hide();
  }

  hidePopup() {
    this.modal.hide();
  }
}
