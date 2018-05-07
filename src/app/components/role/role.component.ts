import { Component, Input, OnInit, NgModule, ViewEncapsulation, ViewChild } from '@angular/core';
import {RoleService} from "../../services/role.service";
import {Router} from "@angular/router";
import {Role} from "../../model/role.model";
import {PERMISSIONS} from "../../model/permission.mode";
import { DataTable, DataTableResource } from '../data-table';


@Component({
  selector: 'app-role',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RoleComponent implements OnInit {

  @ViewChild(DataTable) rolesTable: DataTable;
  constructor(private roleService: RoleService, private router: Router) { }
 
  permissions = PERMISSIONS;

  role = new Role();
  roles = new Array<Role>();
  roleResource = new DataTableResource(this.roles);
  rolesCount = 0;
  showRoleForm = false;

  ngOnInit() {
    this.getRoles();
  }

  carClicked(car) {
    alert(car.name);
  }

  reloadCars(params) {
    this.getRoles();    
  }

  showForm() {
    this.showRoleForm = true;
  }

  createRole() {
    this.roleService.post(JSON.stringify(this.role)).subscribe(res => {
      this.reloadCars(undefined);
      this.showRoleForm = false;
    });
  }

  deleteRole(id: number) {
    this.roleService.delete(id).subscribe(_ => this.reloadCars(undefined));
  }

  private getRoles() {
    this.roleService.get().subscribe(roles => {
      this.roles = roles
      this.rolesCount = roles.length
    });
  }

}