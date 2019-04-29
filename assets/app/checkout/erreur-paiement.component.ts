import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

import { UserService } from '../services/user.service';
import { User } from "../models/user.model";

@Component({
    selector: 'app-erreur-paiement',
    templateUrl: './erreur-paiement.component.html'
})
export class ErreurPaiementComponent implements OnInit {
    myForm: FormGroup;
    myuser: User;
    message: string;

    constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
        route.params.subscribe(val => {
            this.message = this.route.snapshot.paramMap.get('message');
        });
    }

    onSubmit() {
    }


    ngOnInit() {
        this.myuser = this.userService.myuser;

        /*
        const userId = localStorage.getItem('userId');
        
        this.userService.getUserInfoById(userId)
        .subscribe((user) => {
            this.myuser = user;
        });
        */
    }

}