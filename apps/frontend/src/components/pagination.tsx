import clsx from 'clsx';
import type React from 'react';
import { useMemo, useState } from 'react';
import { Button } from './button';

export function PaginationPrevious({
  href = null,
  className,
  children = 'Previous',
  onClick,
}: React.PropsWithChildren<{
  href?: string | null;
  className?: string;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;
}>) {
  return (
    <span className={clsx(className, 'grow basis-0')}>
      <Button
        {...(href === null ? { disabled: true } : { href })}
        plain
        aria-label="Previous page"
        onClick={(
          e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
        ) => {
          if (onClick) {
            e.preventDefault(); // Prevent navigation if onClick is provided
            onClick(e);
          }
        }}
      >
        <svg
          className="stroke-current"
          data-slot="icon"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2.75 8H13.25M2.75 8L5.25 5.5M2.75 8L5.25 10.5"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {children}
      </Button>
    </span>
  );
}

export function PaginationNext({
  href = null,
  className,
  children = 'Next',
  onClick,
}: React.PropsWithChildren<{
  href?: string | null;
  className?: string;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;
}>) {
  return (
    <span className={clsx(className, 'flex grow basis-0 justify-end')}>
      <Button
        {...(href === null ? { disabled: true } : { href })}
        plain
        aria-label="Next page"
        onClick={(
          e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
        ) => {
          if (onClick) {
            e.preventDefault(); // Prevent navigation if onClick is provided
            onClick(e);
          }
        }}
      >
        {children}
        <svg
          className="stroke-current"
          data-slot="icon"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M13.25 8L2.75 8M13.25 8L10.75 10.5M13.25 8L10.75 5.5"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
    </span>
  );
}

export function PaginationList({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      {...props}
      className={clsx(className, 'hidden items-baseline gap-x-2 sm:flex')}
    />
  );
}

export function PaginationPage({
  href,
  className,
  current = false,
  children,
  onClick,
}: React.PropsWithChildren<{
  href: string;
  className?: string;
  current?: boolean;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;
}>) {
  return (
    <Button
      href={href}
      plain
      aria-label={`Page ${children}`}
      aria-current={current ? 'page' : undefined}
      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
        if (onClick) {
          e.preventDefault(); // Prevent navigation if onClick is provided
          onClick(e);
        }
      }}
      className={clsx(
        className,
        'min-w-[2.25rem] before:absolute before:-inset-px before:rounded-lg',
        current && 'before:bg-zinc-950/5 dark:before:bg-white/10'
      )}
    >
      <span className="-mx-0.5">{children}</span>
    </Button>
  );
}

export function PaginationGap({
  className,
  children = <>&hellip;</>,
  ...props
}: React.ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      aria-hidden="true"
      {...props}
      className={clsx(
        className,
        'w-[2.25rem] select-none text-center text-sm/6 font-semibold text-zinc-950 dark:text-white'
      )}
    >
      {children}
    </span>
  );
}

type UsePaginationProps<T> = {
  data: T[];
  itemsPerPage: number;
  initialPage?: number;
};

export function usePagination<T>({
  data,
  itemsPerPage,
  initialPage = 1,
}: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, data, itemsPerPage]);

  return {
    currentPage,
    totalPages,
    paginatedData,
    setCurrentPage,
  };
}

type PaginationProps = React.ComponentPropsWithoutRef<'nav'> & {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  'aria-label'?: string;
  className?: string;
};

export function Pagination({
  'aria-label': ariaLabel = 'Page navigation',
  className,
  currentPage,
  totalPages,
  onPageChange,
  ...props
}: PaginationProps) {
  const generatePageLinks = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationPage
          key={i}
          href={`?page=${i}`}
          current={i === currentPage}
          onClick={(e) => {
            e.preventDefault();
            onPageChange(i);
          }}
        >
          {i}
        </PaginationPage>
      );
    }

    return (
      <>
        {startPage > 1 && <PaginationGap />}
        {pages}
        {endPage < totalPages && <PaginationGap />}
      </>
    );
  };

  return (
    <nav
      aria-label={ariaLabel}
      {...props}
      className={clsx(className, 'flex gap-x-2')}
    >
      <PaginationPrevious
        href={currentPage > 1 ? `?page=${currentPage - 1}` : null}
        onClick={(e) => {
          e.preventDefault();
          if (currentPage > 1) onPageChange(currentPage - 1);
        }}
      />
      <PaginationList>{generatePageLinks()}</PaginationList>
      <PaginationNext
        href={currentPage < totalPages ? `?page=${currentPage + 1}` : null}
        onClick={(e) => {
          e.preventDefault();
          if (currentPage < totalPages) onPageChange(currentPage + 1);
        }}
      />
    </nav>
  );
}
