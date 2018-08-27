import { Component, Input, OnInit, NgModule, ViewEncapsulation, ViewChild } from '@angular/core';
import {RoleService} from "../../services/role.service";
import {Router} from "@angular/router";
import {Role} from "../../model/role.model";
import { DataTable, DataTableResource } from '../data-table';
import { GenericComponent } from '../generic.component';
import { ErrorService } from '../../services/error.service';
import { PermissionService } from '../../services/permission.service';
import { Permission } from '../../model/permission.mode';


@Component({
  selector: 'app-role',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RoleComponent extends GenericComponent {

  permissions: Array<Permission>;

  constructor(private roleService: RoleService, private errorService: ErrorService,
    private permissionService: PermissionService) {
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

  openForm() {
    this.permissionService.get().subscribe(permissions => this.permissions = permissions);
    super.openForm()
  }

  editAction(modelSelected) {
    this.permissionService.get().subscribe(permissions => this.permissions = permissions);
    super.editAction(modelSelected);
  }

}