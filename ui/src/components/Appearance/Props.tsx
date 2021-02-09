import { PropSettings, PedProp } from './interfaces';

import Section from './components/Section';
import Item from './components/Item';
import { FlexWrapper } from './styles';
import Input from './components/Input';

// lol
interface PropsProps {
  getPropSettings: (prop_id: number) => PropSettings;
  getStoredProp: (prop_id: number) => PedProp;
  getProp: (prop_id: number) => PedProp;
  handlePropDrawableChange: (prop_id: number, drawable: number) => void;
  handlePropTextureChange: (prop_id: number, texture: number) => void;
}

const Props: React.FC<PropsProps> = ({
  getPropSettings,
  getStoredProp,
  getProp,
  handlePropDrawableChange,
  handlePropTextureChange,
}) => {
  return (
    <Section title="Acessórios">
      <Item title="Chapéu">
        <FlexWrapper>
          <Input
            title="Modelo"
            min={getPropSettings(0).drawable.min}
            max={getPropSettings(0).drawable.max}
            defaultValue={getProp(0).drawable}
            clientValue={getStoredProp(0).drawable}
            onChange={value => handlePropDrawableChange(0, value)}
          />
          <Input
            title="Textura"
            min={getPropSettings(0).texture.min}
            max={getPropSettings(0).texture.max}
            defaultValue={getProp(0).texture}
            clientValue={getStoredProp(0).texture}
            onChange={value => handlePropTextureChange(0, value)}
          />
        </FlexWrapper>
      </Item>
      <Item title="Óculos">
        <FlexWrapper>
          <Input
            title="Modelo"
            min={getPropSettings(1).drawable.min}
            max={getPropSettings(1).drawable.max}
            defaultValue={getProp(1).drawable}
            clientValue={getStoredProp(1).drawable}
            onChange={value => handlePropDrawableChange(1, value)}
          />
          <Input
            title="Textura"
            min={getPropSettings(1).texture.min}
            max={getPropSettings(1).texture.max}
            defaultValue={getProp(1).texture}
            clientValue={getStoredProp(1).texture}
            onChange={value => handlePropTextureChange(1, value)}
          />
        </FlexWrapper>
      </Item>
      <Item title="Orelha">
        <FlexWrapper>
          <Input
            title="Modelo"
            min={getPropSettings(2).drawable.min}
            max={getPropSettings(2).drawable.max}
            defaultValue={getProp(2).drawable}
            clientValue={getStoredProp(2).drawable}
            onChange={value => handlePropDrawableChange(2, value)}
          />
          <Input
            title="Textura"
            min={getPropSettings(2).texture.min}
            max={getPropSettings(2).texture.max}
            defaultValue={getProp(2).texture}
            clientValue={getStoredProp(2).texture}
            onChange={value => handlePropTextureChange(2, value)}
          />
        </FlexWrapper>
      </Item>
      <Item title="Relógio">
        <FlexWrapper>
          <Input
            title="Modelo"
            min={getPropSettings(6).drawable.min}
            max={getPropSettings(6).drawable.max}
            defaultValue={getProp(6).drawable}
            clientValue={getStoredProp(6).drawable}
            onChange={value => handlePropDrawableChange(6, value)}
          />
          <Input
            title="Textura"
            min={getPropSettings(6).texture.min}
            max={getPropSettings(6).texture.max}
            defaultValue={getProp(6).texture}
            clientValue={getStoredProp(6).texture}
            onChange={value => handlePropTextureChange(6, value)}
          />
        </FlexWrapper>
      </Item>
      <Item title="Bracelete">
        <FlexWrapper>
          <Input
            title="Modelo"
            min={getPropSettings(7).drawable.min}
            max={getPropSettings(7).drawable.max}
            defaultValue={getProp(7).drawable}
            clientValue={getStoredProp(7).drawable}
            onChange={value => handlePropDrawableChange(7, value)}
          />
          <Input
            title="Textura"
            min={getPropSettings(7).texture.min}
            max={getPropSettings(7).texture.max}
            defaultValue={getProp(7).texture}
            clientValue={getStoredProp(7).texture}
            onChange={value => handlePropTextureChange(7, value)}
          />
        </FlexWrapper>
      </Item>
    </Section>
  );
};

export default Props;
