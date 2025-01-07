import { Badge } from './badge';

type BadgeGroupProps = {
  values: string[];
  max?: number;
  className?: string;
};

export function BadgeGroup({ values, max = 7, className }: BadgeGroupProps) {
  if (values.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {values.slice(0, max).map((value, index) => (
        <Badge key={index}>{value}</Badge>
      ))}
      {values.length > max && <Badge>+{values.length - max} more</Badge>}
    </div>
  );
}
