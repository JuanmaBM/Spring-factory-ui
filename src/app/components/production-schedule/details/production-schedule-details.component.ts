import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { ProductionSchedule } from "../../../model/ProductionSchedule.model";
import { ProductionScheduleService } from "../../../services/production-schedule.service";

@Component({
  selector: 'app-schedule-details',
  templateUrl: './production-schedule-details.component.html',
  styleUrls: ['./production-schedule-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductionScheduleDetailsComponent implements OnInit {

    constructor (private router: Router, private route: ActivatedRoute, 
        private scheduleService: ProductionScheduleService) { }

    schedule = new ProductionSchedule();

    ngOnInit() {
        let assignToSchedule = schedule => this.schedule = schedule;
        let getScheduleById = params => this.scheduleService.get(params.id).subscribe(assignToSchedule);
        this.route.params.subscribe(getScheduleById);
    }
}