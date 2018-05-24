import { Component, OnInit, NgModule, ViewEncapsulation, ViewChild } from '@angular/core';
import { UserService } from "../../services/user.service";
import { User } from '../../model/user.model';
import { ErrorService } from '../../services/error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RoleService } from '../../services/role.service';
import { Role } from '../../model/role.model';
import { GenericComponent } from '../generic.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent extends GenericComponent {

  roles = new Array<Role>();

  constructor(private userService: UserService, private errorService: ErrorService, private roleService: RoleService) { 
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
  }

  openForm() {
    super.openForm();
    this.getRoles();
  }

  editAction(userSelected) {
    super.editAction(userSelected);
    this.getRoles();
  }

  private getRoles = () => this.roleService.get().subscribe(roles => this.roles = roles);

}