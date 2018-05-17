import { Injectable } from '@angular/core';
import {AppComponent} from "../app.component";
import { MatSnackBar } from '@angular/material';

@Injectable() export class ErrorService { 
    
  constructor(public snacker: MatSnackBar) { }

  public throwError = (message: string) =>
    this.snacker.open(message, 'Close', { verticalPosition: "bottom" });

}