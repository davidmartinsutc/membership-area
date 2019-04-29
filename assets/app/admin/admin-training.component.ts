import { Component, OnInit } from "@angular/core";
import { Product } from "../models/product.model";
import { Section } from "../models/section.model";
import { SectionService } from "../services/section.service";
import { ProductService } from "../services/product.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NgForm } from "@angular/forms";


@Component({
    selector: 'app-admin-training',
    templateUrl: './admin-training.component.html'
})

export class AdminTrainingComponent implements OnInit {
    products: Product[];
    myproduct: Product;
    uploadFile: File;

    sections: Section[];
    selectedSections: Section[];

    linkedTrainings: Product[];
    linkedProducts: Product[];
    selectedlinkedTrainings: Product[];
    selectedlinkedProducts: Product[];

    constructor(private sectionService: SectionService, private productService: ProductService) { }

    ngOnInit() {

        this.productService.productIsEdit.subscribe(
            (product: Product) => {
                this.myproduct = product;
                this.showAddProduct();
            }
        );

        this.sectionService.getAllSectionsByPositionAndWhatFor('trainings')
            .subscribe(
            (sections: Section[]) => {
                this.sections = sections;
            }
            );
        this.selectedSections = [];

        this.productService.getProducts('trainings')
            .subscribe(
            (products: Product[]) => {
                this.products = products;
                this.linkedTrainings = products;
            }
            );
        this.selectedlinkedTrainings = [];

        this.productService.getProducts('produits')
            .subscribe(
            (products: Product[]) => {
                this.linkedProducts = products;
            }
            );
        this.selectedlinkedProducts = [];
    }


    onSubmit(addProductForm: NgForm) {
        if (this.myproduct) {
            // Edit
            const oldProductName = addProductForm.value.oldProductName;
            this.myproduct.name = addProductForm.value.name;
            if (addProductForm.value.picture) {
                this.myproduct.picture = addProductForm.value.picture;
            }
            else {
                this.myproduct.picture = this.myproduct.picture;
            }
            this.myproduct.description_preview = addProductForm.value.description_preview;
            this.myproduct.description_detail = addProductForm.value.description_detail;
            this.myproduct.benefits_detail = addProductForm.value.benefits_detail;
            this.myproduct.position = addProductForm.value.position;
            this.myproduct.sections = this.selectedSections;
            this.myproduct.image = this.uploadFile;
            this.myproduct.price = addProductForm.value.price;
            this.myproduct.value = addProductForm.value.value;
            this.myproduct.activated = addProductForm.value.activated;
            this.myproduct.video = addProductForm.value.video;
            this.myproduct.duree = addProductForm.value.temps;
            this.myproduct.maj = addProductForm.value.maj;
            this.myproduct.second_title = addProductForm.value.secondTitle;
            this.myproduct.linked_trainings = this.selectedlinkedTrainings;
            this.myproduct.linked_products = this.selectedlinkedProducts;
            this.myproduct.fa_title = addProductForm.value.fa_title;
            this.myproduct.link_to = addProductForm.value.link_to;


            this.productService.update(this.myproduct, oldProductName)
                .subscribe(
                data_productid => {

                    if (this.myproduct.image) {
                        this.productService.addPicture(this.myproduct, data_productid)
                            .subscribe();
                    }
                    this.myproduct = null;
                },
                error => {
                    console.error(error);
                    this.myproduct = null;
                }
                );

        } else {
            // Create
            const myproduct = new Product(
                addProductForm.value.name,
                'trainings',
                addProductForm.value.picture,
                addProductForm.value.description_preview,
                addProductForm.value.description_detail,
                addProductForm.value.benefits_detail,
                addProductForm.value.position,
                this.selectedSections,
                this.uploadFile,
                addProductForm.value.price,
                addProductForm.value.value,
                addProductForm.value.activated,
                addProductForm.value.video,
                addProductForm.value.temps,
                addProductForm.value.maj,
                addProductForm.value.secondTitle,
                this.selectedlinkedTrainings,
                this.selectedlinkedProducts,
                null,
                null,
                addProductForm.value.fa_title,
                addProductForm.value.link_to
            );


            this.productService.addProduct(myproduct)
                .subscribe(
                data_productid => {
                    //this.sections.push(myproduct);
                    if (myproduct.image) {
                        this.productService.addPicture(myproduct, data_productid)
                            .subscribe();
                    }
                },
                error => console.error(error)
                );
        }
        addProductForm.resetForm();
        this.UncheckAll();

        /*
        this.selectedSections = [];
        if (this.sections.length > 0) {
            for (let section of this.sections) {
                (<HTMLInputElement>document.getElementById(section.sectionName)).checked = false;
            }
        }

        this.selectedlinkedTrainings = [];
        if (this.linkedTrainings.length > 0) {
            for (let training of this.linkedTrainings) {
                (<HTMLInputElement>document.getElementById(training.name)).checked = false;
            }
        }


        this.selectedlinkedProducts = [];
        if (this.linkedProducts.length > 0) {
            for (let product of this.linkedProducts) {
                (<HTMLInputElement>document.getElementById(product.name + 'id')).checked = false;
            }
        }
        */
        this.uploadFile = null;
        document.getElementById("addProductDiv").style.display = "none";
    }

    onDelete(product: Product) {
        let r = confirm("Confirmer la supression ?");
        if (r == true) {
            this.productService.deleteProduct(product)
                .subscribe(
                result => {
                    this.products.splice(this.products.indexOf(product), 1);
                });
        }
    }

    onEdit(product: Product) {
        this.productService.editProduct(product)
    }



    addInSection(section: Section) {
        if (this.selectedSections.indexOf(section) < 0) {
            this.selectedSections.push(section);
        }
        else {
            this.selectedSections.splice(this.selectedSections.indexOf(section), 1);
        }
    }


    addInLinkedProduct(product: Product) {
        if (this.selectedlinkedProducts.indexOf(product) < 0) {
            this.selectedlinkedProducts.push(product);
        }
        else {
            this.selectedlinkedProducts.splice(this.selectedlinkedProducts.indexOf(product), 1);
        }
    }

    addInLinkedTraining(training: Product) {
        if (this.selectedlinkedTrainings.indexOf(training) < 0) {
            this.selectedlinkedTrainings.push(training);
        }
        else {
            this.selectedlinkedTrainings.splice(this.selectedlinkedTrainings.indexOf(training), 1);
        }
    }


    showAddProduct() {
        var x = document.getElementById("addProductDiv");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

    fileChanged(file) {
        this.uploadFile = file.target.files[0];
    }

    UncheckAll() {
        var w = document.getElementsByTagName('input');
        for (var i = 0; i < w.length; i++) {
            if (w[i].type == 'checkbox') {
                w[i].checked = false;
            }
        }
    }
}