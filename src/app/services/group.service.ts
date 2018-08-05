import { Injectable } from '@angular/core';
import { GenericService } from "./generic.service";

@Injectable() export class GroupService extends GenericService {

    protected getResourceUrl() {
        return "/group";
    }

    private createTaskGroupUrl(groupId: number, taskId?: number) {

        let url = this.API_URL + this.getResourceUrl() + "/" + groupId + "/task";

        if(taskId) url += "/" + taskId;

        return url;
    }

    public getTask = (groupId: number) =>
        this.http.get(this.createTaskGroupUrl(groupId)).map(this.getResponseBody);

    public deleteTask = (groupId: number, taskId: number) =>
        this.http.delete(this.createTaskGroupUrl(groupId, taskId));

    public createTask = (groupId: number, task: string) =>
        this.http.post(this.createTaskGroupUrl(groupId), task, this.options);
}