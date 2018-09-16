import { AppComponent } from "../app.component";
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

@Injectable() export class WorkLogService {

    private headers = new Headers({'Content-type': 'application/json;charset=UTF-8'});
    private options = new RequestOptions({ headers: this.headers });

    constructor(public http: Http) { }

    private buildResourceUrl(idSchedule: number, idOrder: number, idTask: number, idWorklog?: number) {

        let url = AppComponent.API_URL + "/schedule/" + idSchedule + "/order/" + idOrder + "/task/" + idTask + "/worklog";

        if(idWorklog) {
            url += "/" + idWorklog
        }

        return url;
    };

    private getResponseBody = (response: any) => response.json();

    public post = (idSchedule: number, idOrder: number, idTask: number, body: string) => 
        this.http.post(this.buildResourceUrl(idSchedule, idOrder, idTask), body, this.options);

    public put = (idSchedule: number, idOrder: number, idTask: number, idWorklog: number, body: string) => 
        this.http.put(this.buildResourceUrl(idSchedule, idOrder, idTask, idWorklog), body, this.options);

    public delete = (idSchedule: number, idOrder: number, idTask: number, idWorklog: number) =>
        this.http.delete(this.buildResourceUrl(idSchedule, idOrder, idTask, idWorklog));

    public get = (idSchedule: number, idOrder: number, idTask: number, idWorklog?: number) => 
        this.http.get(this.buildResourceUrl(idSchedule, idOrder, idTask, idWorklog)).map(this.getResponseBody)

}