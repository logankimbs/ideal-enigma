import { clsx } from 'clsx';

export function Screenshot({
  width,
  height,
  src,
  className,
}: {
  width: number;
  height: number;
  src: string;
  className?: string;
}) {
  return (
    <div
      style={{ '--width': width, '--height': height } as React.CSSProperties}
      className={clsx(
        className,
        'relative aspect-[var(--width)/var(--height)] [--radius:theme(borderRadius.xl)]'
      )}
    >
      <div className="absolute -inset-[var(--padding)] rounded-[calc(var(--radius)+var(--padding))] [--padding:theme(spacing.2)]" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        src={src}
        className="h-full rounded-[var(--radius)] shadow-2xl ring-1 ring-black/10"
      />
    </div>
  );
}
