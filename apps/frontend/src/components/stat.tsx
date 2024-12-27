import { Badge } from './badge';
import { Divider } from './divider';

function calculateStreak(value: number): string {
  if (value < 1) return '';
  const flamesCount = Math.min(Math.ceil(value / 2), 3);
  return '🔥'.repeat(flamesCount);
}

type StatProps = {
  title: string;
  value: string;
  change?: string | null;
  streak?: boolean;
};

export function Stat({ title, value, change, streak = false }: StatProps) {
  return (
    <div>
      <Divider />
      <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">{title}</div>
      <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{value}</div>
      <div className="mt-3 text-sm/6 sm:text-xs/6">
        {streak ? calculateStreak(parseInt(value)) : ''}
      </div>
      {change && (
        <div className="mt-3 text-sm/6 sm:text-xs/6">
          <Badge color={change.startsWith('-') ? 'red' : 'green'}>
            {parseFloat(change).toFixed(1)}%
          </Badge>{' '}
          <span className="text-zinc-500">from last week</span>
        </div>
      )}
    </div>
  );
}
