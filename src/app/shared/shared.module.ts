import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductCardComponent} from "./components/product-card/product-card.component";
import {LoaderComponent} from "./components/loader/loader.component";
import {TextLengthPipe} from "./pipes/text-length.pipe";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    ProductCardComponent,
    LoaderComponent,
    TextLengthPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports:[
    ProductCardComponent,
    LoaderComponent,
    TextLengthPipe
  ]
})
export class SharedModule { }
