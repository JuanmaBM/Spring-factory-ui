import { Component, Input, OnInit, NgModule, ViewEncapsulation, ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import { DataTable, DataTableResource } from './data-table';
import { ErrorService } from '../services/error.service';


export abstract class GenericComponent implements OnInit {

  @ViewChild(DataTable) groupsTable: DataTable;
  constructor() { }

  model = this.newModel();
  modelList = this.newModelList();
  tableResource = new DataTableResource(this.modelList);

  showForm = false;
  isEditAction = false;
  itemCount = 0;

  abstract newModel();
  abstract newModelList();
  abstract getGenericService();
  abstract getErrorService();

  ngOnInit() {
    this.getAll();
  }

  reload(params) {
    this.getAll();    
  }

  openForm() {
    this.model = this.newModel();
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
    this.getGenericService().post(JSON.stringify(this.model)).subscribe(res => {
      this.reload(undefined);
      this.showForm = false;
    }, errorResponse => this.getErrorService().throwError(errorResponse));
  }

  edit() {
    let Id = this.model.id;
    let body = JSON.stringify(this.model)

    this.getGenericService().put(Id, body).subscribe(_ => this.showForm = false, 
      errorResponse => this.getErrorService().throwError(errorResponse));
  }

  delete(id: number) {
    this.getGenericService().delete(id).subscribe(_ => this.reload(undefined));
  }

  private getAll = () => this.getGenericService().get().subscribe(res => {
      let list = !!res ? res : [];
      this.modelList = list;
      this.itemCount = list.length;
  });

}