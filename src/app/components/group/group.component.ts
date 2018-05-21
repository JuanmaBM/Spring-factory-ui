import { Component, Input, OnInit, NgModule, ViewEncapsulation, ViewChild } from '@angular/core';
import {RoleService} from "../../services/role.service";
import {Router} from "@angular/router";
import { DataTable, DataTableResource } from '../data-table';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GroupComponent implements OnInit {

  @ViewChild(DataTable) groupsTable: DataTable;
  constructor(private router: Router) { }
 
  ngOnInit() {

  }

}