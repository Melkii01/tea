import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../../shared/services/data.service";
import {Subscription} from "rxjs";
import {OrderResponse} from "../../../types/order-response";

@Component({
  selector: 'order-component',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit, OnDestroy {
  formValues = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[а-яА-Я]+$/)]],
    last_name: ['', [Validators.required, Validators.pattern(/^[а-яА-Я]+$/)]],
    phone: ['', [Validators.required, Validators.pattern(/^[+]?[0-9]{11}$/)]],
    country: ['', [Validators.required]],
    zip: ['', [Validators.required]],
    address: ['', [Validators.required, Validators.pattern(/^[а-яА-Я0-9\s\-\/\\]+$/)]],
    product: ['', [Validators.required]],
    comment: [''],
  })


  private subscriptionProductName: Subscription | null = null;
  private subscriptionOrder: Subscription | null = null;
  btnDisabled = false;
  formHide = false;
  errorResponse = false;

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private dataService: DataService) {
  }

  ngOnInit(): void {
    this.subscriptionProductName = this.activatedRoute.queryParams.subscribe((params) => {
      if (params['product']) {
        this.formValues.patchValue({product: params['product']})
      }
    })

  }

  ngOnDestroy() {
    this.subscriptionProductName?.unsubscribe();
    this.subscriptionOrder?.unsubscribe();
  }

  createOrder() {

    const keys: string[] = Object.keys(this.formValues.controls);
    keys.forEach((key: string) => {
      this.formValues.get(key)?.markAsTouched();
      this.formValues.get(key)?.markAsDirty();
      this.formValues.get(key)?.updateValueAndValidity();
    });


    if (this.formValues.invalid) return;
    //
    this.btnDisabled = true;

    const data: OrderResponse = {
      name: this.formValues.value.name!,
      last_name: this.formValues.value.last_name!,
      phone: this.formValues.value.phone!,
      country: this.formValues.value.country!,
      zip: this.formValues.value.zip!,
      product: this.formValues.value.product!,
      address: this.formValues.value.address!,
    }
    if (this.formValues.value.comment) {
      data.comment = this.formValues.value.comment
    }

    this.subscriptionOrder = this.dataService.createOrder(data)
      .subscribe(response => {
        if (response.success && !response.message) {
          this.formHide = true;
          this.errorResponse = false;
        } else {
          this.errorResponse = true;
          setTimeout(()=>{
            this.errorResponse = false;
          },3000)
        }
        this.btnDisabled = false;
      })

  }
}
