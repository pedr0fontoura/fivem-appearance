import { useNuiState } from '../../hooks/nuiState';
import Section from './components/Section';
import Item from './components/Item';
import { FlexWrapper } from './styles';
import SelectTattoo from './components/SelectTattoo';

import { TattoosSettings, TattooList, Tattoo } from './interfaces';

interface TattoosProps {
  settings: TattoosSettings;
  data: TattooList;
  storedData: TattooList;
  handleApplyTattoo: (value: Tattoo) => void;
  handlePreviewTattoo: (value: Tattoo) => void;
}

const Tattoos = ({ settings, data, storedData, handleApplyTattoo, handlePreviewTattoo }: TattoosProps) => {
  const { locales } = useNuiState();

  const { items } = settings;
  const keys = Object.keys(items);

  if (!locales) {
    return null;
  }

  return (
    <Section title={locales.tattoos.title}>
      {keys.map(key => (
        <Item key={key} title={locales.tattoos.items[key]}>
          <FlexWrapper>
            <SelectTattoo
              handlePreviewTattoo={handlePreviewTattoo}
              handleApplyTattoo={handleApplyTattoo}
              items={items[key]}
            />
          </FlexWrapper>
        </Item>
      ))}
    </Section>
  );
};

export default Tattoos;
