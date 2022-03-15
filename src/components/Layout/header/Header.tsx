import './Header.css';

function Header({ children, title }: React.HTMLAttributes<HTMLElement>): JSX.Element {
  return (
    <div className="Header">
      <div className="Header-title">{title}</div>
      <div className="Header-actions">
        {children}
      </div>
    </div>
  );
}

export default Header;
