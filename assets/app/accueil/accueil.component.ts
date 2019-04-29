import { Component, OnInit } from "@angular/core";
import { UserService } from '../services/user.service';
import { User } from "../models/user.model";

@Component({
    selector: 'app-accueil',
    templateUrl: './accueil.component.html'
})
export class AccueilComponent implements OnInit {
    myuser: User;

    quotes = [
        {quote:"Il faut viser la lune, parce qu’au moins, si vous échouez, vous finirez dans les étoiles.", author:"Oscar Wilde"},
        {quote:"La meilleure façon de prédire l’avenir est de le créer. ", author:"Peter Drucker"},
        {quote:"Croyez en vos rêves et ils se réaliseront peut-être. Croyez en vous et ils se réaliseront sûrement.", author:"Martin Luther King"},
        {quote:"Celui qui veut réussir trouve un moyen. Celui qui veut rien faire trouve une excuse.", author:"Proverbe"},
        {quote:"Le pessimisme est affaire d’humeur, l’optimisme est affaire de volonté.", author:"Alain"},
        {quote:"Si vous pouvez le rêver, vous pouvez le faire.", author:"Walt Disney"},
        {quote:"Tenez-vous à l’écart des gens qui freinent vos ambitions. Les petits esprits font toujours cela. Les plus grands esprits seuls vous font sentir que vous aussi, pouvez devenir grand.", author:"Mark Twain"},
        {quote:"Notre vie vaut ce qu’elle nous a coûté d’efforts.", author:"François Mauriac"},
        {quote:"Il n’y a qu’une façon d’échouer, c’est d’abandonner avant d’avoir réussi.", author:"Georges Clémenceau"}
    ]

    quoteNb = Math.floor(Math.random() * (this.quotes.length));

    constructor(private userService: UserService) {}

    ngOnInit() {
        
        const userId = localStorage.getItem('userId');

        this.userService.getUserInfoById(userId)
        .subscribe((user) => {
            this.myuser = user;
        });
    }

}