import { Role } from "./role.model";
import { Group } from "./group.model";

export class User {
    id: number;
    nif: string;
    name: string;
    surname: string;
    password: string;
    phoneNumber: string;
    email: string;
    rol: Role;
    group: Group;
}