import { Button } from './button';

type ButtonGroupProps = {
  buttons: { id: string; label: string }[]; // Array of button options
  activeButton: string; // Currently active button
  onSetActive: (id: string) => void; // Callback when a button is clicked
  className?: string; // Optional custom class for the container
};

export default function ButtonGroup({
  buttons,
  activeButton,
  onSetActive,
  className = '',
}: ButtonGroupProps) {
  return (
    <div
      className={`isolate inline-flex rounded-lg bg-zinc-100 dark:bg-zinc-500/10 p-1 gap-1 ${className}`}
    >
      {buttons.map(({ id, label }) => {
        const isActive = activeButton === id;

        return isActive ? (
          <Button
            key={id}
            color="dark/white"
            onClick={() => onSetActive(id)} // Active button without the `plain` prop
            className="border-none"
          >
            {label}
          </Button>
        ) : (
          <Button
            key={id}
            plain
            onClick={() => onSetActive(id)} // Inactive button with the `plain` prop
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
}
