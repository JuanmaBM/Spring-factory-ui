export class ProductionSchedule {
    name: string;
    estimatedStartDate: Date;
    estimatedFinishDate: Date;
    realStartDate: Date;
    realFinishDate: Date;
    state: string;
}

export const SCHEDULE_STATES: string[] = ["OPEN", "CLOSE", "IN_PROGRESS"];
