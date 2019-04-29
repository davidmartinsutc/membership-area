import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Cours } from "../models/cours/cours.model";
import { Chapitre } from "../models/cours/chapitre.model";
import { SousChapitre } from "../models/cours/sous-chapitre.model";
import { User } from "../models/user.model";
import { CoursService } from "../services/cours.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from "../services/user.service";
import { Location } from '@angular/common';


import 'rxjs/add/operator/switchMap';
import { setTimeout } from "core-js/library/web/timers";

@Component({
    selector: 'app-trainings-take-course',
    templateUrl: './trainings-take-course.component.html'
})
export class TrainingsTakeCourseComponent implements OnInit, AfterViewInit {
    myuser: User;
    mycourse: Cours;
    scIDInit: string;

    graduateColor = ["icon-block img-circle bg-indigo-300 half text-white",
        "icon-block img-circle bg-green-300 half text-white",
        "icon-block img-circle bg-yellow-300 half text-white",
        "icon-block img-circle bg-orange-300 half text-white",
        "icon-block img-circle bg-amber-300 half text-white",
        "icon-block img-circle bg-brown-300 half text-white",
        "icon-block img-circle bg-blue-grey-300 half text-white",
        "icon-block img-circle bg-light-green-300 half text-white",
        "icon-block img-circle bg-lime-300 half text-white",
        "icon-block img-circle bg-teal-300 half text-white",
        "icon-block img-circle bg-cyan-300 half text-white",
        "icon-block img-circle bg-deep-purple-300 half text-white",
        "icon-block img-circle bg-red-300 half text-white",
        "icon-block img-circle bg-indigo-300 half text-white",
        "icon-block img-circle bg-lime-300 half text-white"]

    constructor(private route: ActivatedRoute, private router: Router, private coursService: CoursService, private userService: UserService) {
        route.params.subscribe(val => {
            this.initialisation();
        });
    }

    ngOnInit() {
        //Recuperation des produits de l'user
        const userId = localStorage.getItem('userId');
        this.userService.getUserInfoById(userId)
            .subscribe((user) => {
                this.myuser = user;
            });
    }

    ngAfterViewInit() {
        setTimeout(function () {
            var allToggle = document.querySelectorAll('*[id^="toggle"]');
            (<HTMLInputElement>document.getElementById(allToggle[0].id)).className='list-group collapse in'
        }, 1500);
    }

    initialisation() {
        const coursID = this.route.snapshot.paramMap.get('coursID');

        this.coursService.getCoursById(coursID)
            .subscribe((coursMap: Cours) => {
                this.mycourse = coursMap;
                let cInit = this.mycourse.chapitres[0];
                let scInit = this.mycourse.chapitres[0].sousChapitres[0];
                this.scIDInit = String('where' + cInit.numero +'.'+ scInit.numero);
            },
            error => this.router.navigate(['/trainings'])
            );
    };

    onDisplaySubChapter(chapitre: Chapitre, sousChapitre: SousChapitre) {

        var allscID = document.querySelectorAll('*[id^="where"]');
        for (var i = 0; i < allscID.length; ++i) {
            allscID[i].innerHTML = '';
        }

        let scID = String('where' + chapitre.numero +'.'+ sousChapitre.numero);
        var curSubChapter = (<HTMLInputElement>document.getElementById(scID));
        curSubChapter.innerHTML = '<i class="fa fa-fw fa-circle text-green-300"></i>';

        (<HTMLInputElement>document.getElementById('currentNumber')).innerHTML = String(chapitre.numero) + '.' + String(sousChapitre.numero);
        (<HTMLInputElement>document.getElementById('chapterSouschapterTitle')).innerHTML = String(sousChapitre.titre);
        (<HTMLInputElement>document.getElementById('chapterSouschapterVideo')).innerHTML = '<iframe src=' + String(sousChapitre.video) + ' | safe"  allowfullscreen="allowfullscreen" mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen" oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen"></iframe>';
        (<HTMLInputElement>document.getElementById('chapterSouschapterTexte')).innerHTML = String(sousChapitre.texte);
    }

    nextSection() {
        var where = (<HTMLInputElement>document.getElementById('currentNumber')).innerHTML;
        var chapitre = where.split('.')[0].trim();
        var sousChapitre = where.split('.')[1].trim();

        var allscID = document.querySelectorAll('*[id^="where"]');
        let next = 0;


        for (var i = 0; i < allscID.length; ++i) {
            if (allscID[i].id == 'where' + chapitre +'.'+ sousChapitre) {
                next = i + 1;
            }
        }
        if (next < allscID.length)  {
            (<HTMLInputElement>document.getElementById(allscID[next].id)).click();
            var nextchapitre = allscID[next].id.split('where')[1].split('.')[0].trim();
            if (nextchapitre != chapitre) {
                var curelement = (<HTMLInputElement>document.getElementById('toggle'+chapitre));
                var nextlement = (<HTMLInputElement>document.getElementById('toggle'+nextchapitre));
                curelement.className='list-group collapse out';
                nextlement.className='list-group collapse in';
            }
        }
    }

    prevSection() {
        var where = (<HTMLInputElement>document.getElementById('currentNumber')).innerHTML;
        var chapitre = where.split('.')[0].trim();
        var sousChapitre = where.split('.')[1].trim();

        var allscID = document.querySelectorAll('*[id^="where"]');
        let prev = 0;

        for (var i = 0; i < allscID.length; ++i) {
            if (allscID[i].id == 'where' + chapitre +'.'+ sousChapitre) {
                prev = i - 1;
            }
        }
        if (prev >= 0) {
            (<HTMLInputElement>document.getElementById(allscID[prev].id)).click();
            var prevchapitre = allscID[prev].id.split('where')[1].split('.')[0].trim();
            if (prevchapitre != chapitre) {
                var curelement = (<HTMLInputElement>document.getElementById('toggle'+chapitre));
                var prevlement = (<HTMLInputElement>document.getElementById('toggle'+prevchapitre));
                curelement.className='list-group collapse out';
                prevlement.className='list-group collapse in';
            }
        }

    }
}