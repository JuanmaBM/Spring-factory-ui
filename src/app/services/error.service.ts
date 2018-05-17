import { Injectable } from '@angular/core';
import {AppComponent} from "../app.component";
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable() export class ErrorService { 
    
  constructor(public snacker: MatSnackBar) { }

  private throw = (message: string, time: number = 5000) =>
    this.snacker.open(message, 'Close', { verticalPosition: "bottom", duration: time });

  public throwError(error?: any, time: number = 5000) {

      let errors = this.extractErrorsFromResponse(error);
      this.throw(errors, time);
  }

  private extractErrorsFromResponse(responseError: any) {

      if (responseError) {
        let err = JSON.parse(responseError._body);
        return err.errors.map(e => e.defaultMessage ? e.defaultMessage : e.field);
      }

      return "Internal Error";
  }

}