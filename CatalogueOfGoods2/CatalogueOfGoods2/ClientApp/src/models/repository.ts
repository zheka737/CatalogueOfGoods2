import { Product } from "./product.model";
import { Injectable } from "@angular/core";
import { Inject } from "@angular/core";
import { CatalogueSettings } from "./catalogueSettings";
import { Colors } from "../models/product.model";
import { ErrorHandlerService, ValidationError } from "../components/errorHandler.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { HttpClient, HttpRequest } from "@angular/common/http";
import { shareReplay } from 'rxjs/operators';


@Injectable()
export class Repository {
    url = "http://localhost:5000/api/products";
    products: Product[] = [];

    catalogueSettings: CatalogueSettings = new CatalogueSettings();

    constructor(private http: HttpClient, @Inject('BASE_URL') private originUrl: string, private  router: Router) {
        this.updateProducts();
        this.fillAllColors();
       
    }

    updateProducts() {

        let url = this.url;

        url = url + "?sortColumn=" + this.catalogueSettings.sortColumn;


        if (this.catalogueSettings.descOrder) {
            url = url + "&descOrder=" + this.catalogueSettings.descOrder;
        }

        if (this.catalogueSettings.nameFilterEnabled) {
            url = url + "&name=" + this.catalogueSettings.nameFilter;
        }

        if (this.catalogueSettings.quantityFilterEnabled) {
            url = url + "&quantity=" + this.catalogueSettings.quantityFilter;
        }

        if (this.catalogueSettings.colorFilterEnabled) {
            url = url + "&color=" + this.catalogueSettings.colorFilter;
        }

        this.sendRequest("GET", url, ).subscribe(response => this.products = (response == null || response == undefined ? [] : response ));
    }

    createProduct(product: Product) {
        let data = {
            name: product.name,
            color: product.color,
            quantity: product.quantity
        };

        this.sendRequest("POST", this.url, data).subscribe(
            response => {
                this.products.push(product);
                this.router.navigateByUrl("/catalogueOfGoods");
            });
    }



    replaceProduct(product: Product) {
        let data = { name: product.name, quantity: product.quantity, color: product.color };

        this.sendRequest("PUT", this.url + "/" + product.productId, data)
            .subscribe(response => {
                this.updateProducts();
                this.router.navigateByUrl("/catalogueOfGoods");
            });

    }

    deleteProduct(id: number) {

        this.sendRequest("DELETE", this.url + "/" + id, )
            .subscribe(response => this.updateProducts());
    }

    public sendRequest(verb: string, url: string,
        data?: any): Observable<any> {
        return this.http.request(new HttpRequest(verb, url, data)).pipe(shareReplay())
    }

    fillAllColors() {
        let i = 0;
        for (let item in Colors) {
            if (isNaN(Number(item))) {
                this.allColors.push({ numberOfColor: i, color: String(item) });
                i = i + 1;
            }
        }
    }

    allColors: any[] = [];
}