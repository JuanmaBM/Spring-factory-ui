import { Component, Input, OnInit, NgModule, ViewEncapsulation, ViewChild } from '@angular/core';
import {RoleService} from "../../services/role.service";
import {Router} from "@angular/router";
import {Role} from "../../model/role.model";
import {PERMISSIONS} from "../../model/permission.mode";
import { DataTable, DataTableResource } from '../data-table';
import { GenericComponent } from '../generic.component';
import { ErrorService } from '../../services/error.service';


@Component({
  selector: 'app-role',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RoleComponent extends GenericComponent {

  permissions = PERMISSIONS;

  constructor(private roleService: RoleService, private errorService: ErrorService) {
    super();
  }

  newModel() {
    return new Role();
  }

  newModelList() {
    return new Array<Role>();
  }

  getGenericService() {
    return this.roleService;
  }

  getErrorService() {
    return this.errorService;
  }

}