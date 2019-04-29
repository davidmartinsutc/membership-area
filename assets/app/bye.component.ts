import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";


@Component({
    selector: 'app-login',
    template: `<style>
    .bye {
        height: 200px;
        width: 4000px;
    
        position: fixed;
        top: 50%;
        left: 52%;
        margin-top: -100px;
        margin-left: -200px;
    
        font-size:80px;
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    </style>
    
    <div class="bye">À Bientôt !</div>`
})
export class ByeComponent {

}