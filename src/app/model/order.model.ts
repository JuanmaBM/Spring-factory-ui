export class Order {
    id: number;
    name: string;
    description: string;
    measurements: string;

    public constructor(order?: Order) {
        if (order !== undefined) {
            this.id = order.id;
            this.name = order.name;
            this.description = order.description;
            this.measurements = order.measurements;
        }
    }
}

export const MEASUREMENTS: string[] = [
    "KILOGRAM", "LITER", "GALON"
];