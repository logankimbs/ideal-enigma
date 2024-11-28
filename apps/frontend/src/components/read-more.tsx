import { ChevronRightIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';

type ReadMoreLinkProps = {
  href: string;
};

export function ReadMore({ href }: ReadMoreLinkProps) {
  return (
    <Link href={href} className="flex items-center gap-1 text-sm/5">
      <span className="absolute inset-0" />
      Read more
      <ChevronRightIcon className="size-4 fill-gray-400" />
    </Link>
  );
}
