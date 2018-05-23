import { Component, Input, OnInit, NgModule, ViewEncapsulation, ViewChild } from '@angular/core';
import { GroupService } from "../../services/group.service";
import {Router} from "@angular/router";
import { DataTable, DataTableResource } from '../data-table';
import { Group } from '../../model/group.model';
import { ErrorService } from '../../services/error.service';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GroupComponent implements OnInit {

  @ViewChild(DataTable) groupsTable: DataTable;
  constructor(private groupService: GroupService, private errorService: ErrorService,
    private router: Router) { }

  model = new Group();
  modelList = new Array<Group>();
  tableResource = new DataTableResource(this.modelList);

  showForm = false;
  isEditAction = false;
  itemCount = 0;

  ngOnInit() {
    this.getAll();
  }

  reload(params) {
    this.getAll();    
  }

  openForm() {
    this.model = new Group();
    this.isEditAction = false;
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.isEditAction = false;
  }

  editAction(modelSelected) {
    this.model = modelSelected
    this.showForm = true;
    this.isEditAction = true;
  }

  create() {
    this.groupService.post(JSON.stringify(this.model)).subscribe(res => {
      this.reload(undefined);
      this.showForm = false;
    }, errorResponse => this.errorService.throwError(errorResponse));
  }

  edit() {
    let Id = this.model.id;
    let body = JSON.stringify(this.model)

    this.groupService.put(Id, body).subscribe(_ => this.showForm = false, 
      errorResponse => this.errorService.throwError(errorResponse));
  }

  delete(id: number) {
    this.groupService.delete(id).subscribe(_ => this.reload(undefined));
  }

  private getAll = () => this.groupService.get().subscribe(res => {
      let list = !!res ? res : [];
      this.modelList = list;
      this.itemCount = list.length;
  });

}