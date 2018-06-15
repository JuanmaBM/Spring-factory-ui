import { Injectable } from '@angular/core';
import { GenericService } from "./generic.service";

@Injectable() export class GroupService extends GenericService {

    protected getResourceUrl() {
        return "/group";
    }
}