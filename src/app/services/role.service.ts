import { Injectable } from '@angular/core';
import { GenericService } from "./generic.service";
import 'rxjs/add/operator/map';

@Injectable() export class RoleService extends GenericService {

    protected getResourceUrl() {
        return "/rol";
    }
}