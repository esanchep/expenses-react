import './TableCell.css';

function TableCell({ children, className }: React.HTMLAttributes<HTMLElement>) {
  return (<div className={className + " cell"}>{children}</div>);
}

export default TableCell;
