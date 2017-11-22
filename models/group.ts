import { User } from './user';

export class Group {
    _id: string;
    name: string;
    memberIds: string[];
    members: User[];
}
