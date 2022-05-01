import '../GenericInputStyle.css';
import './DatePicker.css';

function DatePicker({ handleChange }: { handleChange: (date: Date) => void }): JSX.Element {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => handleChange(new Date(event.target.value));
  return (
    <input type="date" style={{ width: "140px" }} onChange={handleOnChange} />
  );
}

export default DatePicker;
