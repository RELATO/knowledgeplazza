import { Stat } from './stat';
import { User } from './user';

/**
 * Battle
 */
export class Battle {
  _id: string;
  private: boolean;
  owner: User;
  createdAt: Date;
  members: Stat[];
}
