import { useState } from 'react';

export default function Input({
  label,
  id,
  type = 'text',
  onChange,
  initialValue = '',
}) {
  const [value, setValue] = useState(initialValue);

  function handleOnChange(event) {
    const currentValue = event.target.value;

    setValue(currentValue);

    onChange({ value: currentValue });
  }

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} onChange={handleOnChange} value={value} />
    </div>
  );
}
