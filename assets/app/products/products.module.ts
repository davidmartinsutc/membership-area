import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductsAllComponent } from "./products-all.component";
import { ProductsDetailComponent } from "./products-detail.component";

import { ApplicationPipes } from "../pipe/pipe.module"

import { productsRouting } from "./products.routing";

@NgModule({
    declarations: [
        ProductsAllComponent,
        ProductsDetailComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        productsRouting,
        ApplicationPipes
    ]
})

export class ProductsModule {

}