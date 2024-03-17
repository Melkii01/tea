import {Component, Input} from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'product-card-component',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  providers: [DataService]
})
export class ProductCardComponent  {

  @Input() product: ProductType = {} as ProductType;
}
