export class Permission {
    id: Number;
    name: string;
}

export const PERMISSIONS: Permission[] = [
    { id: 1, name: 'MANAGE_TASK' },
    { id: 2, name: 'MANAGE_GROUP' },
    { id: 3, name: 'MANAGE_SCHEDULES' },
    { id: 4, name: 'MANAGE_ISSUE' }
  ];