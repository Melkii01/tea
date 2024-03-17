import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WasInMainPageService {
  private wasInMain: boolean = false;

  constructor() {

  }

  setWasInMainPage(wasInMane: boolean) {
    this.wasInMain = wasInMane;
  }

  getWasInMainPage(): boolean {
    return this.wasInMain;
  }
}
