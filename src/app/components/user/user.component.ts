import { Component, OnInit, NgModule, ViewEncapsulation, ViewChild } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { DataTable, DataTableResource } from '../data-table';
import { User } from '../../model/user.model';
import { ErrorService } from '../../services/error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RoleService } from '../../services/role.service';
import { Role } from '../../model/role.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {

  @ViewChild(DataTable) userTable: DataTable;
  constructor(private userService: UserService, private router: Router, 
    private errorService: ErrorService, private roleService: RoleService) { }

  model = new User();
  modelList = new Array<User>();
  userResource = new DataTableResource(this.modelList);
  roles = new Array<Role>();

  showForm = false;
  isEditAction = false;
  itemCount = 0;

  ngOnInit() {
    this.getAll();
    this.getRoles();
  }

  reload(params) {
    this.getAll();    
  }

  openForm() {
    this.model = new User();
    this.isEditAction = false;
    this.showForm = true;
    this.getRoles();
  }

  closeForm() {
    this.showForm = false;
    this.isEditAction = false;
  }

  editAction(userSelected) {
    this.model = userSelected
    this.showForm = true;
    this.isEditAction = true;
    this.getRoles();
  }

  create() {
    this.userService.post(JSON.stringify(this.model)).subscribe(res => {
      this.reload(undefined);
      this.showForm = false;
    }, errorResponse => this.errorService.throwError(errorResponse));
  }

  edit() {
    let Id = this.model.id;
    let body = JSON.stringify(this.model)

    this.userService.put(Id, body).subscribe(_ => this.showForm = false, 
      errorResponse => this.errorService.throwError(errorResponse));
  }

  delete(id: number) {
    this.userService.delete(id).subscribe(_ => this.reload(undefined));
  }

  private getAll = () => this.userService.get().subscribe(res => {
      let users = !!res ? res : [];
      this.modelList = users;
      this.itemCount = users.length;
  });

  private getRoles = () => this.roleService.get().subscribe(roles => this.roles = roles);

}