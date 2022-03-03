import './TableHead.css';

function TableHead({ children }: React.HTMLAttributes<HTMLElement>) {
  return (<div className="thead">{children}</div>);
}

export default TableHead;