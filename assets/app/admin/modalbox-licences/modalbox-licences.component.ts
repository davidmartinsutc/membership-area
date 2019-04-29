import { Component, OnInit } from "@angular/core";

import { ModalBoxLicences } from "./modalbox-licences.model";
import { ModalBoxLicencesService } from "./modalbox-licences.service";
import { Product } from "../../models/product.model";
import { ProductService } from '../../services/product.service';

import * as papaparse from 'papaparse';

@Component({
    selector: 'app-modalbox-licences',
    templateUrl: './modalbox-licences.component.html',
    styles: [`
        .backdrop {
            background-color: rgba(0,0,0,0.6);
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
        }
    `]
})
export class ModalBoxLicencesComponent implements OnInit {
    modalBox: ModalBoxLicences;
    display = 'none';

    constructor(private modalBoxLicencesService: ModalBoxLicencesService, private productService: ProductService) { }

    onHideManageLicences() {
        (<HTMLInputElement>document.getElementById('productLicences')).value = "";
        (<HTMLInputElement>document.getElementById('resultUpload')).innerHTML = "";
        this.modalBox = null;
        this.display = 'none';
    }

    onAddLicences() {
        this.csvToJson(this.modalBox.licenceFile, this);
        //this.onHideManageLicences();
    }

    ngOnInit() {
        this.modalBoxLicencesService.openBox
            .subscribe(
            (modalBox: ModalBoxLicences) => {
                this.modalBox = modalBox;
                this.display = 'block';
            }
            );
    }


    fileChanged(file) {
        this.modalBox.licenceFile = file.target.files[0];
    }

    uploadStatus(result) {
        document.getElementById('resultUpload').innerHTML = result;
    }

    csvToJson(file, currentClass) {
        const config = {
            delimiter: ";",	// auto-detect
            newline: "",	// auto-detect
            quoteChar: '"',
            header: false,
            dynamicTyping: false,
            preview: 0,
            encoding: "",
            worker: false,
            comments: false,
            step: undefined,
            complete: function (results) {
                var data = results.data;
                currentClass.productService.addLicences(data, currentClass.modalBox.product.productID)
                    .subscribe(() => {
                        currentClass.uploadStatus('Fichier Bien Uploadé');
                    });
            },
            error: function (error) {
                console.log(error);
                currentClass.uploadStatus('Erreur Upload');
            },
            download: false,
            skipEmptyLines: false,
            chunk: undefined,
            fastMode: undefined,
            beforeFirstChunk: undefined,
            withCredentials: undefined
        }
        papaparse.parse(file, config)
    }
}