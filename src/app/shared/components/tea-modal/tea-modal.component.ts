import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tea-modal',
  templateUrl: './tea-modal.component.html',
  styleUrls: ['./tea-modal.component.css']
})
export class TeaModalComponent implements OnInit {
  constructor(private activeModalService: NgbActiveModal,
              private router:Router) {
  }

  ngOnInit(): void {
  }

  hideModal() {
    this.activeModalService.close();
  }
  openProducts(){
    this.router.navigate(['/products']);
  }

}
