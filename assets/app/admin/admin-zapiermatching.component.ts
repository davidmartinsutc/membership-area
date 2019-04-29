import { Component, OnInit } from "@angular/core";
import { Zapiermatching } from "../models/zapiermatching.model";
import { ZapiermatchingService } from "../services/zapiermatching.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NgForm } from "@angular/forms";

@Component({
    selector: 'app-admin-zapiermatching',
    templateUrl: './admin-zapiermatching.component.html'
})

export class AdminZapiermatchingComponent implements OnInit {
    zapiermatchings: Zapiermatching[];
    myzapiermatching: Zapiermatching;


    constructor(private zapiermatchingService: ZapiermatchingService) { }

    ngOnInit() {

        this.zapiermatchingService.zapiermatchingIsEdit.subscribe(
            (zapiermatching: Zapiermatching) => {this.myzapiermatching = zapiermatching}
        );

        this.zapiermatchingService.getAllZapiermatchings()
            .subscribe(
            (zapiermatchings: Zapiermatching[]) => {
                this.zapiermatchings = zapiermatchings;
            }
            );
    }

    onSubmit(addZapiermatchingForm: NgForm) {

        if (this.myzapiermatching) {
            // Edit
            const oldZapiermatchingName = addZapiermatchingForm.value.oldZapiermatchingName;
            this.myzapiermatching.zapier_name = addZapiermatchingForm.value.zapier_name;
            this.myzapiermatching.product_id = addZapiermatchingForm.value.product_id;
            this.zapiermatchingService.update(this.myzapiermatching, oldZapiermatchingName)
                .subscribe(
                result => console.log(result)
                );
            this.myzapiermatching = null;
        } else {
            // Create
            const myzapiermatching = new Zapiermatching(
                addZapiermatchingForm.value.zapier_name,
                addZapiermatchingForm.value.product_id
            );
            this.zapiermatchingService.create(myzapiermatching)
                .subscribe(
                data => {
                    this.zapiermatchings.push(myzapiermatching);
                },
                error => console.error(error)
                );
        }
        addZapiermatchingForm.resetForm();
    }

    zapiermatchingDelete(zapiermatching: Zapiermatching) {
        this.zapiermatchingService.deleteZapiermatching(zapiermatching)
            .subscribe(
            result => {
                this.zapiermatchings.splice(this.zapiermatchings.indexOf(zapiermatching), 1);
            });
    }

    zapiermatchingEdit(zapiermatching: Zapiermatching) {
        this.zapiermatchingService.editZapiermatching(zapiermatching)
    }



}