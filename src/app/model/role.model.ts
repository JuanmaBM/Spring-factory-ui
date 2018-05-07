import { Permission } from "./permission.mode";

export class Role {
    id: string;
    name: string;
    permission: Array<Permission>;
}