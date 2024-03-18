import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from "./main/main.component";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {NgbAccordionModule} from "@ng-bootstrap/ng-bootstrap";
import { AccordionComponent } from './accordion/accordion.component';


@NgModule({
  declarations: [
    MainComponent,
    AccordionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MainRoutingModule,
    NgbAccordionModule
  ],
  exports: [
    MainRoutingModule
  ]
})
export class MainModule {
}
