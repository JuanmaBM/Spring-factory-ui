import { AppComponent } from "../app.component";
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

@Injectable() export class TaskService {

    private headers = new Headers({'Content-type': 'application/json;charset=UTF-8'});
    private options = new RequestOptions({ headers: this.headers });

    constructor(public http: Http) { }

    private buildResourceUrl(idSchedule: number, idOrder: number, idTask?: number) {

        let url = AppComponent.API_URL + "/schedule/" + idSchedule + "/order/" + idOrder + "/task";

        if(idTask) {
            url += "/" + idTask
        }

        return url;
    };

    private getResponseBody = (response: any) => response.json();

    public post = (idSchedule: number, idOrder: number, body: string) => 
        this.http.post(this.buildResourceUrl(idSchedule, idOrder), body, this.options);

    public put = (idSchedule: number, idOrder: number, idTask: number, body: string) => 
        this.http.put(this.buildResourceUrl(idOrder, idTask), body, this.options);

    public delete = (idSchedule: number, idOrder: number, idTask: number) =>
        this.http.delete(this.buildResourceUrl(idOrder, idTask));

    public get = (idSchedule: number, idOrder: number, idTask?: number) => 
        this.http.get(this.buildResourceUrl(idSchedule, idOrder, idTask)).map(this.getResponseBody)

}