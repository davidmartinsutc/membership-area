import { Component, OnInit } from "@angular/core";
import { CommandeService } from '../services/commande.service';
import { User } from "../models/user.model";
import { Commande } from "../models/commande.model";

@Component({
    selector: 'app-commande',
    templateUrl: './commandes.component.html'
})
export class CommandesComponent implements OnInit {
    commandes: Commande[];

    constructor(private commandeService: CommandeService) { }

    ngOnInit() {

        this.commandeService.getAllCommandes()
            .subscribe((commandes) => {
                this.commandes = commandes;
            });
    }

    validateCommande(commande: Commande) {
        commande.traite = true;
        this.commandeService.setValidated(commande).subscribe();
    }

}