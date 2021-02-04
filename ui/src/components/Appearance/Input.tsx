import { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface InputProps {
  title?: string;
  min: number;
  max: number;
  default?: number;
  onChange: (value: number) => void;
}

const Container = styled.div`
  min-width: 0;

  display: flex;
  flex-direction: column;
  flex-grow: 1;

  margin-top: ${({ title }) => (title ? '5px' : '0')};

  small {
    font-weight: 200;
  }

  > div {
    min-width: 0;
    height: 30px;

    display: flex;
    align-items: center;

    margin-top: 5px;

    button {
      height: 100%;
      min-width: 30px;

      display: flex;
      align-items: center;
      justify-content: center;

      color: #fff;

      outline: 0;
      border: none;
      border-radius: 2px;

      background: rgba(0, 0, 0, 0.5);

      &:hover {
        background: rgba(0, 0, 0);
      }
    }

    input {
      min-width: 0;
      height: 100%;

      flex-grow: 1;
      flex-shrink: 1;

      text-align: center;
      font-size: 14px;
      color: #fff;

      border: none;
      border-radius: 2px;
      margin: 0 2px;

      background: rgba(0, 0, 0, 0.8);

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
`;

const Input: React.FC<InputProps> = ({ title, min, max, onChange }) => {
  const [value, setValue] = useState(min);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const setSafeValue = useCallback(
    (_value: number) => {
      let safeValue = _value;

      if (safeValue < min) {
        safeValue = max;
      } else if (safeValue > max) {
        safeValue = min;
      }

      setValue(safeValue);
    },
    [min, max, setValue],
  );

  const handleChange = useCallback(
    e => {
      const parsedValue = parseInt(e.target.value);

      setSafeValue(parsedValue);
      onChange(parsedValue);
    },
    [setSafeValue, onChange],
  );

  return (
    <Container onClick={handleContainerClick}>
      {title ? <small>{title}</small> : null}
      <div>
        <button type="button" onClick={() => setSafeValue(value - 1)}>
          <FiChevronLeft strokeWidth={5} />
        </button>
        <input type="number" ref={inputRef} value={value} onChange={handleChange} />
        <button type="button" onClick={() => setSafeValue(value + 1)}>
          <FiChevronRight strokeWidth={5} />
        </button>
      </div>
    </Container>
  );
};

export default Input;
