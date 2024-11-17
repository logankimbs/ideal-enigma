import type { Metadata } from 'next';
import EmptyRepositoryState from '../../../components/empty-repository';
import { RepositoryStackedList } from '../../../components/repository-stacked-list';
import { getRespository } from '../../libs/api';

export const metadata: Metadata = {
  title: 'Repository',
};

export default async function Repository() {
  const repository = await getRespository();

  if (!repository.length) return <EmptyRepositoryState />;

  return <RepositoryStackedList repository={repository} />;
}
