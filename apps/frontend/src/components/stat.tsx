import { Badge } from "./badge";
import { Divider } from "./divider";

type StatProps = {
  title: string;
  value: string;
  change?: string;
};

export function Stat(props: StatProps) {
  return (
    <div>
      <Divider />
      <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">
        {props.title}
      </div>
      <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">
        {props.value}
      </div>
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
