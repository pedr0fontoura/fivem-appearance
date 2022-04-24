import { ReactNode } from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: string | ReactNode;
  onClick: () => void;
}

const CustomButton = styled.span`
  padding: 5px 12px;
  color: rgba(255, 255, 255, 0.9);
  background-color: rgba(0, 0, 0, 0.7);
  text-align: center;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-weight: 200;
  cursor: pointer;
`;

const Button = ({ children, onClick }: ButtonProps) => {
  return <CustomButton onClick={onClick}>{children}</CustomButton>;
};

export default Button;
