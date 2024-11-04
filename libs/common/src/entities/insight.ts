import { Tag } from './tag';
import { Timestamp } from './timestamp';
import { User } from './user';

export interface Insight extends Timestamp {
  id: string;
  text: string;
  user: User;
  tags?: Tag[];
  link?: string;
}
