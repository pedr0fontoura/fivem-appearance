import { useRef } from 'react';
import styled from 'styled-components';
import Select from 'react-select';

interface SelectInputProps {
  title: string;
  items: string[];
  defaultValue: string;
  clientValue: string;
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
`;

const customStyles: any = {
  control: (styles: any) => ({
    ...styles,
    marginTop: '10px',
    background: 'rgba(0, 0, 0, 0.8)',
    fontSize: '14px',
    color: '#fff',
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
  }),
  placeholder: (styles: any) => ({
    ...styles,
    fontSize: '14px',
    color: '#fff',
  }),
  input: (styles: any) => ({
    ...styles,
    fontSize: '14px',
    color: '#fff',
  }),
  singleValue: (styles: any) => ({
    ...styles,
    fontSize: '14px',
    color: '#fff',
    border: 'none',
    outline: 'none',
  }),
  indicatorContainer: (styles: any) => ({
    ...styles,
    borderColor: '#fff',
    color: '#fff',
  }),
  dropdownIndicator: (styles: any) => ({
    ...styles,
    borderColor: '#fff',
    color: '#fff',
  }),
  menuPortal: (styles: any) => ({
    ...styles,
    color: '#fff',
    zIndex: 9999,
  }),
  menu: (styles: any) => ({
    ...styles,
    background: 'rgba(0, 0, 0, 0.8)',
    position: 'absolute',
    marginBottom: '10px',
    borderRadius: '4px',
  }),
  menuList: (styles: any) => ({
    ...styles,
    background: 'rgba(0, 0, 0, 0.8)',
    borderRadius: '4px',
    '&::-webkit-scrollbar': {
      width: '10px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'none',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '4px',
      background: '#fff',
    },
  }),
  option: (styles: any, { isFocused }: any) => ({
    ...styles,
    borderRadius: '4px',
    width: '97%',
    marginLeft: 'auto',
    marginRight: 'auto',
    background: isFocused ? 'rgba(255, 255, 255, 0.1)' : 'none',
  }),
};

const SelectInput = ({ title, items, defaultValue, clientValue, onChange }: SelectInputProps) => {
  const selectRef = useRef<any>(null);

  const handleChange = (event: any, { action }: any): void => {
    if (action === 'select-option') {
      onChange(event.value);
    }
  };

  return (
    <Container>
      <span>
        <small>{title}</small>
        <small>{clientValue}</small>
      </span>
      <Select
        ref={selectRef}
        styles={customStyles}
        options={items.map(item => ({ value: item, label: item }))}
        value={{ value: defaultValue, label: defaultValue }}
        onChange={handleChange}
        menuPortalTarget={document.body}
      />
    </Container>
  );
};

export default SelectInput;
