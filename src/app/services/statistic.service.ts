import { AppComponent } from "../app.component";
import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions } from '@angular/http';

@Injectable() export class StatisticService {
    
    constructor(public http: Http) { }

    private getResponseBody = (response: any) => response.json();

    private buildResourceUrl(scheduleId: number, orderId: number) {

        return AppComponent.API_URL + "/schedule/" + scheduleId + "/order/" + orderId + "/statistic";
    }


    public get = (scheduleId: number, orderId: number) => 
        this.http.get(this.buildResourceUrl(scheduleId, orderId)).map(this.getResponseBody)
}