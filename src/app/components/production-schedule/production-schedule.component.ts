import { Component, ViewEncapsulation } from '@angular/core';
import { ProductionScheduleService } from "../../services/production-schedule.service";
import { ProductionSchedule } from "../../model/ProductionSchedule.model";
import { SCHEDULE_STATES } from "../../model/ProductionSchedule.model";
import { DataTable, DataTableResource } from '../data-table';
import { GenericComponent } from '../generic.component';
import { ErrorService } from '../../services/error.service';


@Component({
  selector: 'app-schedule',
  templateUrl: './production-schedule.component.html',
  styleUrls: ['./production-schedule.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductionScheduleComponent extends GenericComponent {

  scheduleStates = SCHEDULE_STATES;

  constructor(private productionScheduleService: ProductionScheduleService, private errorService: ErrorService) {
    super();
  }

  newModel() {
    return new ProductionSchedule();
  }

  newModelList() {
    return new Array<ProductionSchedule>();
  }

  getGenericService() {
    return this.productionScheduleService;
  }

  getErrorService() {
    return this.errorService;
  }

  public config(item) {
    
  }

}