import { Component, OnInit, NgModule, ViewEncapsulation, ViewChild } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { DataTable, DataTableResource } from '../data-table';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {

  @ViewChild(DataTable) userTable: DataTable;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {

  }

}