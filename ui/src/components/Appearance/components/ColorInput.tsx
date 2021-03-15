import { useCallback } from 'react';
import styled, { css } from 'styled-components';

interface ColorInputProps {
  title?: string;
  colors?: number[][];
  defaultValue?: number;
  clientValue?: number;
  onChange: (value: number) => void;
}

interface ButtonProps {
  selected: boolean;
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
    width: 100%;

    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;

    margin-top: 10px;
  }
`;

const Button = styled.button<ButtonProps>`
  height: 20px;
  width: 20px;

  border: 2px solid rgba(0, 0, 0, 0.2);

  margin: 1px;

  &:hover {
    border: 2px solid rgba(255, 255, 255, 0.5);
  }

  ${({ selected }) =>
    selected &&
    css`
      border: 2px solid rgba(255, 255, 255, 1);
    `}
`;

const ColorInput: React.FC<ColorInputProps> = ({ title, colors = [], defaultValue, clientValue, onChange }) => {
  const selectColor = useCallback(
    color => {
      onChange(color);
    },
    [onChange],
  );

  return (
    <Container>
      <span>
        <small>{`${title}: ${defaultValue}`}</small>
        <small>{clientValue}</small>
      </span>
      <div>
        {colors.map((color, index) => (
          <Button
            key={index}
            style={{ backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})` }}
            selected={defaultValue === index}
            onClick={() => selectColor(index)}
          />
        ))}
      </div>
    </Container>
  );
};

export default ColorInput;
