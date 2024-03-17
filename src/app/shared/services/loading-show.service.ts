import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingShowService {
  private loadingShow: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public loaderVisible(): void {
    this.loadingShow.next(true);
  }

  public loaderHide(): void {
    this.loadingShow.next(false);
  }

  public getLoaderState(): Observable<boolean> {
    return this.loadingShow.asObservable();
  }
}
