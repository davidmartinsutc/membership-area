import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { User } from "../models/user.model";
import { Mdp } from "../models/mdp.model";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";


@Component({
    selector: 'app-modif',
    templateUrl: './modif.component.html'
})
export class ModifComponent implements OnInit {
    infoForm: FormGroup;
    mdpForm: FormGroup;
    myuser: User;

    constructor(private userService: UserService, private router: Router) { }

    checkPass() {
        //Store the password field objects into variables ...
        var pass1 = (<HTMLInputElement>document.getElementById('mdpNew'));
        var pass2 = (<HTMLInputElement>document.getElementById('mdpValidation'));
        var btnChangeMdp = (<HTMLInputElement>document.getElementById('btnChangeMdp'));
        //Store the Confimation Message Object ...
        //Set the colors we will be using ...
        var goodColor = "#66cc66";
        var badColor = "#ff6666";
        //Compare the values in the password field 
        //and the confirmation field
        if (pass1.value == pass2.value) {
            //The passwords match. 
            //Set the color to the good color and inform
            pass2.style.backgroundColor = goodColor;
            btnChangeMdp.disabled = false;
        } else {
            //The passwords do not match.
            //Set the color to the bad color and
            pass2.style.backgroundColor = badColor;
            btnChangeMdp.disabled = true;
        }
    }

    onSubmitInfo() {
        const user = new User(
            this.myuser.email.trim().toLowerCase(),
            '',
            this.infoForm.value.firstName ? this.infoForm.value.firstName : this.myuser.firstName,
            this.infoForm.value.lastName ? this.infoForm.value.lastName : this.myuser.lastName,
            this.infoForm.value.phone ? this.infoForm.value.phone : this.myuser.phone,
            this.infoForm.value.birthdate ? this.infoForm.value.birthdate : this.myuser.birthDate
        );
        this.userService.myuser.firstName = user.firstName;
        this.userService.myuser.lastName = user.lastName;
        this.userService.myuser.phone = user.phone;
        this.userService.myuser.birthDate = user.birthDate;        

        this.userService.update(user)
            .subscribe(
            data => console.log(data),
            error => console.error(error)
            );
        this.router.navigateByUrl('/account/display');
    }

    onSubmitMdp() {
        const mdp = new Mdp(
            this.myuser.email.trim().toLowerCase(),
            this.mdpForm.value.mdpActuel,
            this.mdpForm.value.mdpNew,
            this.mdpForm.value.mdpValidation
        );
        this.userService.updatemdp(mdp)
            .subscribe(
            data => console.log(data),
            error => console.error(error)
            );
        this.router.navigateByUrl('/account/display');
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


        this.infoForm = new FormGroup({
            firstName: new FormControl(null),
            lastName: new FormControl(null),
            phone: new FormControl(null),
            birthdate: new FormControl(null)
        });

        this.mdpForm = new FormGroup({
            mdpActuel: new FormControl(null, Validators.required),
            mdpNew: new FormControl(null, Validators.required),
            mdpValidation: new FormControl(null, Validators.required)
        });
    }
}
