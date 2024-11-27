import type { Metadata } from 'next';
import SummariesView from '../../../components/summary-view';
import { getSummaries } from '../../libs/api';

export const metadata: Metadata = {
  title: 'Summaries',
};

export default async function Summaries() {
  const summaries = await getSummaries();

  return <SummariesView summaries={summaries} />;
}
