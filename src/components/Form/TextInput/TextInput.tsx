import '../GenericInputStyle.css';

function TextInput({ handleChange }: { handleChange: (text: string) => void }): JSX.Element {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => handleChange(event.target.value);
  return (<input type="text" onChange={handleOnChange} />);
}

export default TextInput;
