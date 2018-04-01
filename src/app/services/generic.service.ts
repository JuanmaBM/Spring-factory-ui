import {AppComponent} from "../app.component";
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/**
 * Generic class wicht implements CRUD functionality to a specified class
 */
@Injectable() export abstract class GenericService {

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

    public post = (body: string) => this.http.post(this.buildResourceUrl(undefined), body);

    public put = (id: number, body: string) => this.http.put(this.buildResourceUrl(id), body);

    public delete = (id: number) => this.http.delete(this.buildResourceUrl(id));

    public get = (id?: number) => this.http.get(this.buildResourceUrl(id)).map(this.getResponseBody)
}