import Section from './components/Section';
import Item from './components/Item';
import ListInput from './components/ListInput';

interface PedProps {
  items: string[];
  model: string;
  handleModelChange: (value: string) => void;
}

const Ped: React.FC<PedProps> = ({ items, model, handleModelChange }) => (
  <Section title="Ped">
    <Item>
      <ListInput title="Model" items={items} defaultValue={model} onChange={value => handleModelChange(value)} />
    </Item>
  </Section>
);

export default Ped;
