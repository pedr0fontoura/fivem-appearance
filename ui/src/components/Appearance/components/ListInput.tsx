import { useState, useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface InputProps {
  title?: string;
  items: any[];
  defaultValue?: string;
  clientValue?: string;
  onChange: (value: string) => void;
}

const Container = styled.div`
  min-width: 0;

  display: flex;
  flex-direction: column;
  flex-grow: 1;

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

    > div {
      min-width: 0;
      height: 100%;

      position: relative;

      display: flex;

      flex-grow: 1;
      flex-shrink: 1;

      margin: 0 2px;

      span {
        height: 100%;
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: center;

        position: absolute;

        border-left: 10px solid transparent;
        border-right: 10px solid transparent;

        pointer-events: none;

        z-index: 2;

        overflow: hidden;
      }

      input {
        width: 100%;
        height: 100%;

        text-align: center;
        font-size: 14px;

        color: transparent;

        border: none;
        border-radius: 2px;

        background: rgba(0, 0, 0, 0.8);

        &:hover {
          cursor: default;
        }

        &::selection {
          color: transparent;
        }

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }
    }
  }
`;

const ListInput: React.FC<InputProps> = ({ title, items, defaultValue, clientValue, onChange }) => {
  const [value, setValue] = useState(0);
  const [currentValue] = useState(clientValue);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (defaultValue) {
      const index = items.findIndex(item => item === defaultValue);
      if (index !== -1) {
        setValue(index);
      }
    }
  }, [defaultValue, items, setValue]);

  const handleContainerClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const setSafeValue = useCallback(
    (_value: number) => {
      let safeValue = _value;
      const maxValue = items.length - 1;

      if (safeValue < 0) {
        safeValue = maxValue;
      } else if (safeValue > maxValue) {
        safeValue = 0;
      }

      setValue(safeValue);
      onChange(items[safeValue]);
    },
    [items, setValue, onChange],
  );

  const handleChange = useCallback(
    e => {
      let parsedValue = parseInt(e.target.value);

      if (Number.isNaN(parsedValue)) {
        parsedValue = 0;
      }

      setSafeValue(parsedValue);
    },
    [setSafeValue],
  );

  return (
    <Container onClick={handleContainerClick}>
      <span>
        <small>{title}</small>
        <small>{currentValue}</small>
      </span>
      <div>
        <button type="button" onClick={() => setSafeValue(value - 1)}>
          <FiChevronLeft strokeWidth={5} />
        </button>
        <div>
          <span>{items[value]}</span>
          <input type="number" ref={inputRef} value={value} onChange={handleChange} />
        </div>
        <button type="button" onClick={() => setSafeValue(value + 1)}>
          <FiChevronRight strokeWidth={5} />
        </button>
      </div>
    </Container>
  );
};

export default ListInput;
