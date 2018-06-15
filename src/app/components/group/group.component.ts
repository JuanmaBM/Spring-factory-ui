import { Component, Input, OnInit, NgModule, ViewEncapsulation, ViewChild } from '@angular/core';
import { GroupService } from "../../services/group.service";
import {Router} from "@angular/router";
import { DataTable, DataTableResource } from '../data-table';
import { Group } from '../../model/group.model';
import { ErrorService } from '../../services/error.service';
import { GenericComponent } from '../generic.component';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GroupComponent extends GenericComponent {

  constructor(private groupService: GroupService, private errorService: ErrorService) {
    super();
  }

  newModel() {
    return new Group();
  }

  newModelList() {
    return new Array<Group>();
  }

  getGenericService() {
    return this.groupService;
  }

  getErrorService() {
    return this.errorService;
  }
}