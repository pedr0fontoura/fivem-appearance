import { useState, useCallback, useRef, useMemo } from 'react';
import styled from 'styled-components';

interface RangeInputProps {
  title?: string;
  min: number;
  max: number;
  factor?: number;
  defaultValue?: number;
  clientValue?: number;
  onChange: (value: number) => void;
}

const Container = styled.div`
  width: 100%;

  > span {
    width: 100%;

    display: flex;
    justify-content: space-between;
    font-weight: 200;
  }

  > div {
    display: flex;
    align-items: center;

    position: relative;

    margin-top: 10px;

    > small {
      font-weight: 200;
      font-size: 8px;
    }
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

const RangeInput: React.FC<RangeInputProps> = ({
  min,
  max,
  factor = 1,
  title,
  defaultValue,
  clientValue,
  onChange,
}) => {
  const [value, setValue] = useState(defaultValue ? defaultValue / factor : 0);

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

      let fixedValue = parsedValue * factor;
      fixedValue = +fixedValue.toFixed(2);

      onChange(fixedValue);
    },
    [setValue, onChange, factor],
  );

  const fixedValue = useMemo(() => {
    let n = value * factor;
    n = +n.toFixed(2);
    return n;
  }, [value, factor]);

  return (
    <Container onClick={handleContainerClick}>
      <span>
        <small>
          {title}: {fixedValue}
        </small>
        <small>{clientValue}</small>
      </span>
      <div>
        <small>{min * factor}</small>
        <input type="range" ref={inputRef} value={value} min={min} max={max} onChange={handleChange} />
        <small>{max * factor}</small>
      </div>
    </Container>
  );
};

export default RangeInput;
