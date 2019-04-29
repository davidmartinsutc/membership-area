import { Component, OnInit } from "@angular/core";
import { User } from "../models/user.model";
import { UserService } from "../services/user.service";
import { ProductService } from "../services/product.service";
import { ModalBoxService } from "./modalbox/modalbox.service";

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Product } from "../models/product.model";

//                 this.errorService.handleError(error.json());


@Component({
    selector: 'app-admin-users',
    templateUrl: './admin-users.component.html'
})

export class AdminUsersComponent implements OnInit {
    users: User[];
    addUserForm: FormGroup;
    products: Product[];
    trainings: Product[];

    constructor(private userService: UserService, private productService: ProductService, private modalBoxService: ModalBoxService) { }

    ngOnInit() {
        this.userService.getAllUsers()
            .subscribe(
            (users: User[]) => {
                this.users = users;
            }
            );

        this.productService.getProducts('trainings')
            .subscribe(
            (trainings: Product[]) => {
                this.trainings = trainings;
            }
            );

        this.productService.getProducts('produits')
            .subscribe(
            (products: Product[]) => {
                this.products = products;
            }
            );

        this.addUserForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required),
            phone: new FormControl(null),
            birthdate: new FormControl(null)
        });
    }

    onSubmit() {
        const user = new User(
            this.addUserForm.value.email.trim().toLowerCase(),
            this.addUserForm.value.password,
            this.addUserForm.value.firstName,
            this.addUserForm.value.lastName,
            this.addUserForm.value.phone,
            this.addUserForm.value.birthdate
        );

        this.userService.signup(user)
            .subscribe(
            data => {
                this.users.push(user);
            },
            error => console.error(error)
            );
        this.addUserForm.reset();
    }

    userDelete(user: User) {
        let r = confirm("Confirmer la supression ?");
        if (r == true) {
            this.userService.deleteUser(user.email.trim().toLowerCase())
                .subscribe(
                result => {
                    this.users.splice(this.users.indexOf(user), 1);
                });
        }
    }


    onAddProduct(user: User) {
        this.modalBoxService.addProducts(user, this.products, 'produit');
    }

    onAddTraining(user: User) {
        this.modalBoxService.addProducts(user, this.trainings, 'training');
    }

    onAddAdmin(user: User) {
        this.userService.addAdmin(user).subscribe();
    }

}