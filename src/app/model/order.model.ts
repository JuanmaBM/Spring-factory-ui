import { Group } from "./group.model";

export class Order {
    id: number;
    name: string;
    description: string;
    measurements: string;
    groupsAssigned: Array<Group>;

    public constructor(order?: Order) {
        if (order !== undefined) {
            this.id = order.id;
            this.name = order.name;
            this.description = order.description;
            this.measurements = order.measurements;
            this.groupsAssigned = order.groupsAssigned;
        }
    }
}

export const MEASUREMENTS: string[] = [
    "KILOGRAM", "LITER", "GALON"
];