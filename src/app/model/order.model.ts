export class Order {
    id: number;
    name: string;
    description: string;
    measurements: string;
}

export const MEASUREMENTS: string[] = [
    "KILOGRAM", "LITER", "GALON"
];