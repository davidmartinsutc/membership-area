import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Product } from "../models/product.model";
import { Section } from "../models/section.model";
import { ErrorService } from "../errors/error.service";
import { environment } from '../../../environments/environments';


@Injectable()
export class ProductService {
    private products: Product[] = [];
    productIsEdit = new EventEmitter<Product>();

    constructor(private http: Http, private errorService: ErrorService) {
    }


    addPicture(product: Product, productID: string) {
        const formData: any = new FormData();
        const image = product.image;
        const imageName = image.name.replace(/\s/g, "");

        formData.append('uploadFile', image, imageName);
        formData.append('productID', productID);


        return this.http.post(environment.siteUrl+'/product/picture', formData)
            .map(files => files.json())
            .catch((error: Response) => {
                this.errorService.handleError(error);
                return Observable.throw(error);
            });
    }

    addProduct(product: Product) {
        const body = JSON.stringify(product);
        const headers = new Headers({ 'Content-Type': 'application/json' });

        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.post(environment.siteUrl+'/product' + token, body, { headers: headers })
            .map((response: Response) => {
                const result = response.json();
                const product = new Product(
                    result.obj.name,
                    'produit',
                    result.obj.picture,
                    result.obj.description_preview,
                    result.obj.description_detail,
                    result.obj.benefits_detail,
                    result.obj.position,
                    null,
                    null,
                    result.obj.price.toFixed(2),
                    result.obj.value.toFixed(2),
                    result.obj.activated
                );
                this.products.push(product);
                return result.obj._id;  //On retourne l'id du produit
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }




    getProducts(whatFor: string) {          //whatFor : produits ou trainings
        return this.http.get(environment.siteUrl+'/product/' + whatFor)
            .map((response: Response) => {
                const products = response.json().obj;
                let transformedProducts: Product[] = [];

                for (let product of products) {

                    let sectionProduct: Section[] = [];
                    for (let section of product.sections) {
                        sectionProduct.push(
                            new Section(section.position, section.sectionName, section.whatFor, section._id)
                        )
                    }

                    transformedProducts.push(new Product(
                        product.name,
                        whatFor,
                        product.picture,
                        product.description_preview,
                        product.description_detail,
                        product.benefits_detail,
                        product.position,
                        sectionProduct,
                        null,
                        product.price.toFixed(2),
                        product.value.toFixed(2),
                        product.activated,
                        product.video,
                        product.temps,
                        new Date(product.maj),
                        product.second_title,
                        product.linked_trainings,
                        product.linked_products,
                        product.testimonials,
                        product._id,
                        product.fa_title,
                        product.link_to,
                        product.offered_trainings,
                        product.formationProduit,
                        product.downloadableBonus,
                        product.iframelink
                    ));
                }

                this.products = transformedProducts;
                return transformedProducts;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getProductByName(productName: string) {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get(environment.siteUrl+'/product/name/' + productName + token)
            .map((response: Response) => {
                const resProduct = response.json().obj;
                const product = new Product(resProduct.name, resProduct.whatFor, resProduct.picture, resProduct.description_preview, resProduct.description_detail, resProduct.benefits_detail, resProduct.position, resProduct.sections, null, resProduct.price.toFixed(2), resProduct.value.toFixed(2), resProduct.activated, resProduct.video, resProduct.temps, new Date(resProduct.maj), resProduct.second_title, resProduct.linked_trainings, resProduct.linked_products, resProduct.testimonials, resProduct._id, resProduct.fa_title, resProduct.link_to, resProduct.offered_trainings, resProduct.formationProduit, resProduct.downloadableBonus, resProduct.iframelink);
                return product;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    editProduct(product: Product) {
        this.productIsEdit.emit(product);
    }

    update(product: Product, oldProductName: String) {

        const body = JSON.stringify(product);
        const headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.patch(environment.siteUrl+'/product/' + oldProductName, body, { headers: headers })
            .map((response: Response) => {
                const result = response.json();
                return result.obj._id;  //On retourne l'id du produit
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    deleteProduct(product: Product) {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.delete(environment.siteUrl+'/product/' + product.name + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    productBuilder(productFromNode: any) {

        let sectionProduct: Section[] = [];
        for (let section of productFromNode.sections) {
            sectionProduct.push(
                new Section(section.position, section.sectionName, section.whatFor, section._id)
            )
        }

        return new Product(
            productFromNode.name,
            productFromNode.whatFor,
            productFromNode.picture,
            productFromNode.description_preview,
            productFromNode.description_detail,
            productFromNode.benefits_detail,
            productFromNode.position,
            sectionProduct,
            null,
            productFromNode.price.toFixed(2),
            productFromNode.value.toFixed(2),
            productFromNode.activated,
            productFromNode.video,
            productFromNode.temps,
            new Date(productFromNode.maj),
            productFromNode.second_title,
            productFromNode.linked_trainings,
            productFromNode.linked_products,
            productFromNode.testimonials,
            productFromNode._id,
            productFromNode.fa_title,
            productFromNode.link_to,
            productFromNode.offered_trainings,
            productFromNode.formationProduit,
            productFromNode.downloadableBonus,
            productFromNode.iframelink
        )
    }


    addLicences(licences: any, productID: string) {

        const body = JSON.stringify(licences);
        const headers = new Headers({ 'Content-Type': 'application/json' });


        return this.http.post(environment.siteUrl+'/product/licence/' + productID, body, { headers: headers })
            .map(files => files.json())
            .catch((error: Response) => {
                this.errorService.handleError(error);
                return Observable.throw(error);
            });
    }

    getLicences(productID: string) {
        return this.http.get(environment.siteUrl+'/product/licence/' + productID)
            .map((response: Response) => {
                const result = response.json();
                return result.obj._id;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

}