import { Component, Input, OnInit, NgModule, ViewEncapsulation, ViewChild } from '@angular/core';
import { GroupService } from "../../services/group.service";
import {Router} from "@angular/router";
import { DataTable, DataTableResource } from '../data-table';
import { Group } from '../../model/group.model';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GroupComponent implements OnInit {

  @ViewChild(DataTable) groupsTable: DataTable;
  constructor(private groupService: GroupService, private router: Router) { }

  groups = new Array<Group>();
  group = new Group();
  tableResource = new DataTableResource(this.groups);

  rowCount = 0;
  showFormFlag = false;
  isEditAction = false;
 
  ngOnInit() {

  }

  reload(params) {
    this.getAll();    
  }

  showForm() {
    this.group = new Group();
    this.showFormFlag = true;
  }

  closeForm() {
    this.showFormFlag = false;
    this.isEditAction = false;
  }

  editRoleAction(roleSelected) {
    this.group = roleSelected
    this.showFormFlag = true;
    this.isEditAction = true;
  }

  createRole() {
    this.groupService.post(JSON.stringify(this.group)).subscribe(res => {
      this.reload(undefined);
      this.showFormFlag = false;
    });
  }

  editRole() {
    let roleId = this.group.id;
    let body = JSON.stringify(this.group)

    this.groupService.put(roleId, body).subscribe(_ => this.showFormFlag = false);
  }

  deleteRole(id: number) {
    this.groupService.delete(id).subscribe(_ => this.reload(undefined));
  }

  private getAll = () => this.groupService.get().subscribe(groups => this.groups = groups)

}