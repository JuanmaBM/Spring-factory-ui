export class Group {
    id: number;
    name: string;
    startHour: string;
    finishHour: string;
    
    constructor(id?: number) {
        this.id = id;
    }
}