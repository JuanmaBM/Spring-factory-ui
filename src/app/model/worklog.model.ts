import { Group } from "./group.model";
import { User } from "./user.model";

export class WorkLog {
    id: number;
    hoursWorked: number;
    description: String;
    group: Group;
    author: User;
}