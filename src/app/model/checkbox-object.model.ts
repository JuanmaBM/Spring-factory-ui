export class CheckboxObject {
    selected: boolean;
    object: Object;

    constructor(selected: boolean, object: Object) {
        this.selected = selected;
        this.object = object;
    }
}