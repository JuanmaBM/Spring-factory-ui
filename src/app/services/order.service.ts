import { AppComponent } from "../app.component";
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { GenericService } from "./generic.service";

@Injectable() export class OrderService {

    private headers = new Headers({'Content-type': 'application/json;charset=UTF-8'});
    private options = new RequestOptions({ headers: this.headers });

    constructor(public http: Http) { }

    private buildResourceUrl(idTask: number, idOrder?: number) {

        let url = AppComponent.API_URL + "/schedule/" + idTask + "/order";

        if(idOrder) {
            url += "/" + idOrder
        }

        return url;
    };

    private getResponseBody = (response: any) => response.json();

    public post = (idTask: number, body: string) => 
        this.http.post(this.buildResourceUrl(idTask), body, this.options);

    public put = (idTask: number, idOrder: number, body: string) => 
        this.http.put(this.buildResourceUrl(idTask, idOrder), body, this.options);

    public delete = (idTask: number, idOrder: number) => this.http.delete(this.buildResourceUrl(idTask, idOrder));

    public get = (idTask: number, idOrder?: number) => 
        this.http.get(this.buildResourceUrl(idTask, idOrder)).map(this.getResponseBody)

}