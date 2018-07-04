import { AppComponent } from "../app.component";
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

@Injectable() export class CommentService {

    private headers = new Headers({'Content-type': 'application/json;charset=UTF-8'});
    private options = new RequestOptions({ headers: this.headers });

    constructor(public http: Http) { }

    private buildResourceUrl(idSchedule: number, idOrder: number, idTask: number, idComment?: number) {

        let url = AppComponent.API_URL + "/schedule/" + idSchedule + "/order/" + idOrder + "/task" + idTask + "/worklog";

        if(idComment) {
            url += "/" + idComment
        }

        return url;
    };

    private getResponseBody = (response: any) => response.json();

    public post = (idSchedule: number, idOrder: number, idTask: number, body: string) => 
        this.http.post(this.buildResourceUrl(idSchedule, idOrder, idTask), body, this.options);

    public put = (idSchedule: number, idOrder: number, idTask: number, idComment: number, body: string) => 
        this.http.put(this.buildResourceUrl(idSchedule, idOrder, idTask, idComment), body, this.options);

    public delete = (idSchedule: number, idOrder: number, idTask: number, idComment: number) =>
        this.http.delete(this.buildResourceUrl(idSchedule, idOrder, idTask, idComment));

    public get = (idSchedule: number, idOrder: number, idTask: number, idComment?: number) => 
        this.http.get(this.buildResourceUrl(idSchedule, idOrder, idTask, idComment)).map(this.getResponseBody)

}