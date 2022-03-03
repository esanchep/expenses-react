import './Table.css';

export function Table({ className, children }: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className={className + " table"}>{children}</div>
  );
}
