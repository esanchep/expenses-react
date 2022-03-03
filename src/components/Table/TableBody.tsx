import './TableBody.css';

function TableBody({ children }: React.HTMLAttributes<HTMLElement>) {
  return (<div className="tbody">{children}</div>);
}

export default TableBody;
