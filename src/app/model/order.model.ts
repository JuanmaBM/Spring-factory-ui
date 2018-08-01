import { Group } from "./group.model";

export class Order {
    id: number;
    name: string;
    description: string;
    measurements: string;
    groupsAssigned: Array<Group>;
    status: string;

    public constructor(order?: Order) {
        if (order !== undefined) {
            this.id = order.id;
            this.name = order.name;
            this.description = order.description;
            this.measurements = order.measurements;
            this.status = order.status;
            this.groupsAssigned = order.groupsAssigned;
        }
    }
}

export enum OrderStatusEnum {
    OPEN = 'OPEN', CLOSE = 'CLOSE', IN_PROGRESS = 'IN_PROGRESS'
};

export const MEASUREMENTS: string[] = [
    "KILOGRAM", "LITER", "GALON"
];