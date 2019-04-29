import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-admin',
    template: ` 
                <header class="row spacing">
                    <nav class="col-md-8 col-md-offset-2">
                        <ul class="nav nav-tabs">
                            <li routerLinkActive="active"><a [routerLink]="['usermanaments']">Users</a></li>
                            <li routerLinkActive="active"><a [routerLink]="['sectionsproduits']">Sections-Produits</a></li>
                            <li routerLinkActive="active"><a [routerLink]="['sectionstrainings']">Sections-Trainings</a></li>
                            <li routerLinkActive="active"><a [routerLink]="['produits']">Logiciels</a></li>
                            <li routerLinkActive="active"><a [routerLink]="['formations']">Formations</a></li>
                            <li routerLinkActive="active"><a [routerLink]="['notifications']">Notifications</a></li>
                            <li routerLinkActive="active"><a [routerLink]="['bonus']">Bonus</a></li>
                            <li routerLinkActive="active"><a [routerLink]="['licences']">Licences</a></li>
                            <li routerLinkActive="active"><a [routerLink]="['coursoverview']">Cours</a></li>
                            <li routerLinkActive="active"><a [routerLink]="['bonuspageoverview']">BonusPages</a></li>
                            <li routerLinkActive="active"><a [routerLink]="['coupdecoeur']">Coupdecoeur</a></li>
                            <li routerLinkActive="active"><a [routerLink]="['zapiermatching']">Matching Zapier</a></li>
                        </ul>
                    </nav>
                </header>
                <div class="row spacing">
                <router-outlet></router-outlet>
                </div>
                `
})

export class AdminComponent {

}