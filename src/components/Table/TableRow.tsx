import './TableRow.css';

function TableRow({ children }: { children: JSX.Element | JSX.Element[] }) {
  return (<div className="tr">{children}</div>);
}

export default TableRow;
