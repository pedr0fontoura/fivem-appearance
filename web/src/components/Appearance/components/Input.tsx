import { useCallback, useRef } from 'react';
import styled from 'styled-components';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface InputProps {
  title?: string;
  min?: number;
  max?: number;
  defaultValue: number;
  clientValue: number;
  onChange: (value: number) => void;
}

const Container = styled.div`
  min-width: 0;

  display: flex;
  flex-direction: column;
  flex-grow: 1;

  margin-top: ${({ title }) => (title ? '5px' : '0')};

  > span {
    width: 100%;

    display: flex;
    justify-content: space-between;
    font-weight: 200;
  }

  > div {
    min-width: 0;
    height: 30px;

    display: flex;
    align-items: center;

    margin-top: 10px;

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

const Input: React.FC<InputProps> = ({ title, min = 0, max = 255, defaultValue, clientValue, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const getSafeValue = useCallback(
    (_value: number) => {
      let safeValue = _value;

      if (safeValue < min) {
        safeValue = max;
      } else if (safeValue > max) {
        safeValue = min;
      }

      return safeValue;
    },
    [min, max],
  );

  const handleChange = useCallback(
    (_value: any) => {
      let parsedValue;

      if (!_value && _value !== 0) return;

      if (Number.isNaN(_value)) return;

      if (typeof _value === 'string') {
        parsedValue = parseInt(_value);
      } else {
        parsedValue = _value;
      }

      const safeValue = getSafeValue(parsedValue);

      onChange(safeValue);
    },
    [getSafeValue, onChange],
  );

  return (
    <Container onClick={handleContainerClick}>
      <span>
        <small>{title}</small>
        <small>{clientValue}</small>
      </span>
      <div>
        <button type="button" onClick={() => handleChange(defaultValue - 1)}>
          <FiChevronLeft strokeWidth={5} />
        </button>
        <input type="number" ref={inputRef} value={defaultValue} onChange={e => handleChange(e.target.value)} />
        <button type="button" onClick={() => handleChange(defaultValue + 1)}>
          <FiChevronRight strokeWidth={5} />
        </button>
      </div>
    </Container>
  );
};

export default Input;
