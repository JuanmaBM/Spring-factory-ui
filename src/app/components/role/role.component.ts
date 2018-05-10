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
  isEditRoleAction = false;

  ngOnInit() {
    this.getRoles();
  }

  reload(params) {
    this.getRoles();    
  }

  showForm() {
    this.role = new Role();
    this.showRoleForm = true;
  }

  closeForm() {
    this.showRoleForm = false;
    this.isEditRoleAction = false;
  }

  editRoleAction(roleSelected) {
    this.role = roleSelected
    this.showRoleForm = true;
    this.isEditRoleAction = true;
  }

  createRole() {
    this.roleService.post(JSON.stringify(this.role)).subscribe(res => {
      this.reload(undefined);
      this.showRoleForm = false;
    });
  }

  editRole() {
    let roleId = this.role.id;
    let body = JSON.stringify(this.role)

    this.roleService.put(roleId, body).subscribe(_ => this.showRoleForm = false);
  }

  deleteRole(id: number) {
    this.roleService.delete(id).subscribe(_ => this.reload(undefined));
  }

  /**
   * Retrieves all roles and counts the ocurrences
   */
  private getRoles() {
    this.roleService.get().subscribe(roles => {
      this.roles = roles
      this.rolesCount = roles.length
    });
  }

}