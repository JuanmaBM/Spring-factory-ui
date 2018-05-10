import {AppComponent} from "../app.component";
import { Headers, Http, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/**
 * Generic class wicht implements CRUD functionality to a specified class
 */
@Injectable() export abstract class GenericService {

    private headers = new Headers({'Content-type': 'application/json;charset=UTF-8'});
    private options = new RequestOptions({ headers: this.headers });

    constructor(public http: Http) { }
        
    /**
     * Must return a string and must have a '/' before the name resource
     */
    protected abstract getResourceUrl();

    private buildResourceUrl(id?: number) {

        let url = AppComponent.API_URL + this.getResourceUrl();

        if(id) {
            url += "/" + id
        }

        return url;
    };

    private getResponseBody = (response: any) => response.json();

    public post = (body: string) => 
        this.http.post(this.buildResourceUrl(undefined), body, this.options);

    public put = (id: number, body: string) => 
        this.http.put(this.buildResourceUrl(id), body, this.options);

    public delete = (id: number) => this.http.delete(this.buildResourceUrl(id));

    public get = (id?: number) => this.http.get(this.buildResourceUrl(id)).map(this.getResponseBody)
}