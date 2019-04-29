import { Component, OnInit } from "@angular/core";
import { Product } from "../models/product.model";
import { Section } from "../models/section.model";
import { SectionService } from "../services/section.service";
import { ProductService } from "../services/product.service";
import { SectionCounter } from "../models/sectioncounter.model";
import { User } from "../models/user.model";
import { UserService } from "../services/user.service";


@Component({
    selector: 'app-member-products',
    templateUrl: './member-products.component.html'
})
export class MemberProductsComponent implements OnInit {

    myuser: User;
    products: Product[];

    constructor(private sectionService: SectionService, private userService: UserService) { }

    ngOnInit() {


        const userId = localStorage.getItem('userId');
        this.userService.getUserInfoById(userId)
            .subscribe((user) => {
                this.myuser = user;
                var array = this.myuser.userProducts;
                var flags = [], output = [], l = array.length, i;
                for (i = 0; i < l; i++) {
                    if (flags[array[i].productID]) continue;
                    flags[array[i].productID] = true;
                    output.push(array[i]);
                }
                this.products = output;
            });
    }

    onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

}