import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormsModule, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Panier } from "../models/panier.model";

import { PanierService } from "../services/panier.service";
import { UserService } from '../services/user.service';
import { User } from "../models/user.model";

@Component({
    selector: 'app-paiement',
    templateUrl: './paiement.component.html'
})
export class PaiementComponent implements OnInit, AfterViewInit, OnDestroy {
    myForm: FormGroup;
    myuser: User;
    mycart: Panier;


    @ViewChild('cardInfo') cardInfo: ElementRef;

    card: any;
    cardHandler = this.onChange.bind(this);
    error: string;

    constructor(private cd: ChangeDetectorRef, private userService: UserService, private panierService: PanierService, private router: Router) { }


    ngAfterViewInit() {

        this.card = elements.create('card', { hidePostalCode: true });
        this.card.mount(this.cardInfo.nativeElement);

        this.card.addEventListener('change', this.cardHandler);
    }

    ngOnDestroy() {
        this.card.removeEventListener('change', this.cardHandler);
        this.card.destroy();
    }


    onChange({ error }) {
        if (error) {
            this.error = error.message;
        } else {
            this.error = null;
        }
        this.cd.detectChanges();
    }

    async onSubmit(form: NgForm) {

        var validloader = (<HTMLInputElement>document.getElementById('valid-loader'));
        var validbutton = (<HTMLInputElement>document.getElementById('valid-button'));
        validbutton.disabled = true;

        const { token, error } = await stripe.createToken(this.card);
        if (error) {
            validbutton.disabled = false;
        } else {
            validloader.style.display = 'block';
            validbutton.disabled = true;

            token.country = 'FR'
            token.stripeToken = token.id

            this.panierService.sendToken(localStorage.getItem('userId'), token)
                .subscribe(message => {
                    if (message.validate) {
                        //On ajouter les items à l'utilisateur
                        //On vide la panier

                        this.panierService.emptyBasket(this.myuser).subscribe();
                        this.myuser.panier.map(product => {
                            if (product.whatFor == "produits") {
                                this.userService.addProductToUser(this.myuser, product)
                                    .subscribe(() => {
                                        //this.panierService.removeProductsFromBasket(this.myuser, product).subscribe();
                                        this.panierService.mypanier.numberOfItems -= 1;
                                        if (this.panierService.mypanier.numberOfItems == 0) {
                                            this.panierService.mypanier.products = [];
                                            this.panierService.mypanier.total = 0
                                        }
                                    })
                            } else if (product.whatFor == "trainings") {
                                this.userService.addTrainingToUser(this.myuser, product)
                                    .subscribe(() => {
                                        //this.panierService.removeProductsFromBasket(this.myuser, product).subscribe();
                                        this.panierService.mypanier.numberOfItems -= 1;
                                        if (this.panierService.mypanier.numberOfItems == 0) {
                                            this.panierService.mypanier.products = [];
                                            this.panierService.mypanier.total = 0
                                        }
                                    })
                            }
                        })
                        this.router.navigate(['/checkout/confirm']);
                    } else {
                        this.router.navigate(['/checkout/erreur']);
                    }
                },
                error => {
                    this.router.navigate(['/checkout/erreur/'+error.error.message.split('.')[0]]);
                })
        }
    }


    ngOnInit() {
        this.mycart = this.panierService.mypanier;

        if (this.userService.myuser) {
            this.myuser = this.userService.myuser;
        }
        else {
            const userId = localStorage.getItem('userId');
            this.userService.getUserInfoById(userId)
                .subscribe((user) => {
                    this.myuser = user;
                });
        }
    }

}