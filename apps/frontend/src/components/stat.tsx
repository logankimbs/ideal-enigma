import { Badge } from './badge';
import { Divider } from './divider';

type StatProps = {
  title: string;
  value: string;
  change?: string;
  flamer?: boolean;
};

function calculateFlames(value: number): string {
  if (value >= 1 && value <= 2) {
    return '🔥';
  } else if (value >= 3 && value <= 4) {
    return '🔥🔥';
  } else if (value >= 5) {
    return '🔥🔥🔥';
  } else {
    return '';
  }
}

export function Stat(props: StatProps) {
  let flames = '';

  if (props.flamer) {
    flames = calculateFlames(parseInt(props.value));
  }

  return (
    <div>
      <Divider />
      <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">
        {props.title}
      </div>
      <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">
        {props.value}
      </div>
      <div className="mt-3 text-sm/6 sm:text-xs/6">{flames}</div>
      {props.change && (
        <div className="mt-3 text-sm/6 sm:text-xs/6">
          <Badge color={props.change.startsWith('+') ? 'lime' : 'pink'}>
            {props.change}
          </Badge>{' '}
          <span className="text-zinc-500">from last week</span>
        </div>
      )}
    </div>
  );
}
