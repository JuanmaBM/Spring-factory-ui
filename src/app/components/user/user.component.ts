import { Component, OnInit, NgModule, ViewEncapsulation, ViewChild } from '@angular/core';
import { UserService } from "../../services/user.service";
import { User } from '../../model/user.model';
import { ErrorService } from '../../services/error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RoleService } from '../../services/role.service';
import { Role } from '../../model/role.model';
import { GenericComponent } from '../generic.component';
import { GroupService } from '../../services/group.service';
import { Group } from '../../model/group.model';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent extends GenericComponent {

  roles = new Array<Role>();
  groups = new Array<Group>();

  constructor(private userService: UserService, private errorService: ErrorService, private roleService: RoleService, 
    private groupService : GroupService) { 
    super();
  }

  newModel() {
    return new User();
  }

  newModelList() {
    return new Array<User>();
  }

  getGenericService() {
    return this.userService;
  }

  getErrorService() {
    return this.errorService;
  }

  ngOnInit() {
    super.ngOnInit();
    this.getRoles();
    this.getGroups();
  }

  openForm() {
    super.openForm();
    this.getRoles();
    this.getGroups();
  }

  editAction(userSelected) {
    super.editAction(userSelected);
    this.getRoles();
    this.getGroups();
  }

  create() {
    this.model.password = Md5.hashAsciiStr(this.model.password).toString()
    super.create();
  }
  

  private getRoles = () => this.roleService.get().subscribe(roles => this.roles = roles);
  private getGroups = () => this.groupService.get().subscribe(groups => this.groups = groups);

}