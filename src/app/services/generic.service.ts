import { AppComponent } from "../app.component";
import { Headers, Http, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/**
 * Generic class wicht implements CRUD functionality to a specified class
 */
@Injectable() export abstract class GenericService {

    private headers = new Headers({'Content-type': 'application/json;charset=UTF-8'});
    protected options = new RequestOptions({ headers: this.headers });
    protected API_URL = AppComponent.API_URL; 

    constructor(public http: Http) { }
        
    /**
     * Must return a string and must have a '/' before the name resource
     */
    protected abstract getResourceUrl();

    private buildResourceUrl(id?: number, queryParams?: Map<string, string>, sortList?: Array<string>) {

        let url = AppComponent.API_URL + this.getResourceUrl();

        if(id) {
            url += "/" + id
        }

        if (queryParams) {
            url = this.addQueryParamsIntoUrl(queryParams, url);
        }
        if (sortList) {
            url = this.addSortIntoUrl(sortList, url);
        }

        return url;
    };

    private addQueryParamsIntoUrl(queryParams: Map<string, string>, url: string) : string {
        let urlWithQuery = url.indexOf('?') == -1 ? url + "?" : url;
        queryParams.forEach((value, key) => {
            urlWithQuery += key + '=' + value + "&&";
        });
        return urlWithQuery;
    }

    private addSortIntoUrl(sortList: Array<string>, url: string) : string {
        let reduceSortList = (previous, next) => previous + next + ",";
        let initialValue = url.indexOf('?') == -1 ? url + "?sort=" : url + "sort=";
        let urlWithSort = sortList.reduce(reduceSortList, initialValue);
        // remove last comma
        return urlWithSort.slice(0, -1);
    }

    protected getResponseBody = (response: any) => response.json();

    public post = (body: string) => 
        this.http.post(this.buildResourceUrl(undefined), body, this.options);

    public put = (id: number, body: string) => 
        this.http.put(this.buildResourceUrl(id), body, this.options);

    public delete = (id: number) => this.http.delete(this.buildResourceUrl(id));

    public get = (id?: number, queryParams?: Map<string, string>, sortList?: Array<string>) => 
        this.http.get(this.buildResourceUrl(id, queryParams, sortList)).map(this.getResponseBody)
}