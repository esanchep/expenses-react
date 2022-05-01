import './Select.css';

export type SelectDataType = { label: string; value: string | number | undefined; };

function Select({ data = [], className, style, width, disabled, handleSelect }: {
  data: SelectDataType[];
  className?: string;
  style?: React.CSSProperties;
  width?: string;
  disabled?: boolean;
  handleSelect: (value: any) => void;
}): JSX.Element {
  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => handleSelect(event.target.value);
  const getStyle = () => {
    if (!!width && !!style) {
      return { ...style, width };
    }
    if (!!width) {
      return { width };
    }
    if (!!style) {
      return { ...style };
    }
  };

  return (
    <select onChange={handleOnChange} className={className} style={getStyle()} disabled={disabled}>
      {data.map(element => <option key={element.label} value={element.value}>{element.label}</option>)}
    </select>
  );
}

export default Select;
