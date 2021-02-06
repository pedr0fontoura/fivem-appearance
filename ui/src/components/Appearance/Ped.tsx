import Section from './components/Section';
import Item from './components/Item';
import ListInput from './components/ListInput';

import { PedSettings } from './interfaces';

interface PedProps {
  settings: PedSettings;
  model: string;
  handleModelChange: (value: string) => void;
}

const Ped: React.FC<PedProps> = ({ settings, model, handleModelChange }) => (
  <Section title="Ped">
    <Item>
      <ListInput
        title="Model"
        items={settings.model.items}
        defaultValue={model}
        clientValue={settings.model.clientValue}
        onChange={value => handleModelChange(value)}
      />
    </Item>
  </Section>
);

export default Ped;
