import { Permission } from "./permission.mode";

export class Role {
    id: number;
    name: string;
    permission: Array<Permission>;
}