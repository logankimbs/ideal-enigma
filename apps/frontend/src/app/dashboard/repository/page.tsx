import type { Metadata } from 'next';
import RepositoryView from '../../../components/repository-view';
import { getRespository } from '../../libs/api';

export const metadata: Metadata = {
  title: 'Repository',
};

export default async function Repository() {
  const repository = await getRespository();

  return <RepositoryView repository={repository} />;
}
