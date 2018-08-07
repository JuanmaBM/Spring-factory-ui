import { User } from "./user.model";
import { Group } from "./group.model";

export class Comment {
    id: number;
    text: string;
    creationDate: Date;
    modificationDate: Date;
    author: User;
    group: Group;
}