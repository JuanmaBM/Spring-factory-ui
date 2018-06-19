import { User } from "./user.model";

export class Task {

    id: number;
    name: string;
    description: string;
    estimatedTime: number;
    orderNumber: number;
    startDate: Date;
    finishDate: Date;
    creator: User;
    status: TaskStatus;
    priority: TaskPriority;
    workLogs: Array<WorkLog>;
    comments: Array<Comment>;
}

export enum TaskStatus { OPENED = "OPENED", IN_PROGRESS = "IN_PROGRESS", ON_HOLD = "ON_HOLD", BLOCKED = "BLOCKED",
    FINISHED = "FINISHED", REJECTED = "REJECTED", DELETED = "DELETED" }

export enum TaskPriority { LOW = "LOW", MEDIUM = "MEDIUM", HIGH = "HIGH" }

export class WorkLog {

    id: number;
    hoursWorked: number;
    comment: Comment;
}

export class Comment {

    id: number;
    author: User;
    text: string;
    creationDate: Date;
    modificationDate: Date;
}