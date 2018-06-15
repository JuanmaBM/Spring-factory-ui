import { Injectable } from '@angular/core';
import { GenericService } from "./generic.service";
import 'rxjs/add/operator/map';

@Injectable() export class UserService extends GenericService {

    protected getResourceUrl() {
        return "/user";
    }
}