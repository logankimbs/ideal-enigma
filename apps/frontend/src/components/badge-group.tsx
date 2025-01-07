import { Badge } from './badge';

type BadgeGroupProps = {
  values: string[];
  max?: number;
};

export function BadgeGroup({ values, max = 7 }: BadgeGroupProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {values.length > 0 ? (
        <>
          {values.slice(0, max).map((value, index) => (
            <Badge key={index}>{value}</Badge>
          ))}
          {values.length > max && <Badge>+{values.length - max} more</Badge>}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
