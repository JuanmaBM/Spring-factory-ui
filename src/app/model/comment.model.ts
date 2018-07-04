import { User } from "./user.model";

export class Comment {
    id: number;
    text: string;
    creationDate: Date;
    modificationDate: Date;
    author: User;
}