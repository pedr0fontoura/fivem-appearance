import { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';

interface RangeInputProps {
  title?: string;
  min: number;
  max: number;
  factor?: number;
  default?: number;
  onChange: (value: number) => void;
}

const Container = styled.div`
  width: 100%;

  span {
    font-weight: 200;
    font-size: smaller;
  }

  small {
    font-weight: 200;
    font-size: 8px;
  }

  > div {
    display: flex;
    align-items: center;

    margin-top: 10px;
  }

  input[type='range'] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 15px;
    background: rgba(0, 0, 0, 0.8);
    outline: none;
    opacity: 1;
    border-radius: 2px;
    margin: 0 10px;
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 17px;
    height: 17px;
    background: #eeeeee;
    cursor: pointer;
    border-radius: 2px;
  }
`;

const RangeInput: React.FC<RangeInputProps> = ({ min, max, factor, title, onChange }) => {
  const [value, setValue] = useState(Math.floor((min + max) / 2));

  const inputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const handleChange = useCallback(
    e => {
      const parsedValue = parseInt(e.target.value);

      setValue(parsedValue);

      const finalValue = factor ? parsedValue * factor : parsedValue;

      onChange(finalValue);
    },
    [setValue, onChange, factor],
  );

  return (
    <Container onClick={handleContainerClick}>
      {title ? <span>{title}</span> : null}
      <div>
        <small>{factor ? min * factor : min}</small>
        <input type="range" ref={inputRef} value={value} min={min} max={max} onChange={handleChange} />
        <small>{factor ? max * factor : max}</small>
      </div>
    </Container>
  );
};

export default RangeInput;
