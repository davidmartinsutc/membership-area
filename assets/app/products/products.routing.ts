import { Routes, RouterModule } from "@angular/router";

import { ProductsAllComponent } from "./products-all.component";
import { ProductsDetailComponent } from "./products-detail.component";

const PRODUCTS_ROUTES: Routes = [
    { path: '', component: ProductsAllComponent, pathMatch: 'full' },
    { path: ':detail', component: ProductsDetailComponent },
    { path: '**', component: ProductsAllComponent }
];

export const productsRouting = RouterModule.forChild(PRODUCTS_ROUTES);