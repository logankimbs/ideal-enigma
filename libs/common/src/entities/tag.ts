import { Insight } from './insight';
import { Timestamp } from './timestamp';

export interface Tag extends Timestamp {
  id: string;
  text: string;
  insights: Insight[];
}
