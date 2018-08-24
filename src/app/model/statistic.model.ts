export class Statistic {
    status: Map<string, number>;
    priority: Map<string, number>;
    estimatedHours: Map<string, number>;
    workedHours: Map<string, number>;
    taskByGroup: Map<string, number>;
    workedHoursByGroup: Map<string, number>;
    commentByTask: Map<string, number>;
    totalEstimatedTime: number;
    totalWorkedHours: number;
}