import { PropSettings } from './interfaces';

import Section from './components/Section';
import Item from './components/Item';
import { FlexWrapper } from './styles';
import Input from './components/Input';

// lol
interface PropsProps {
  getPropSettings: (prop_id: number) => PropSettings | undefined;
  getPropDrawable: (prop_id: number) => number | undefined;
  getPropTexture: (prop_id: number) => number | undefined;
  handlePropDrawableChange: (prop_id: number, drawable: number) => void;
  handlePropTextureChange: (prop_id: number, texture: number) => void;
}

const Props: React.FC<PropsProps> = ({
  getPropSettings,
  getPropDrawable,
  getPropTexture,
  handlePropDrawableChange,
  handlePropTextureChange,
}) => (
  <Section title="Acessórios">
    <Item title="Chapéu">
      <FlexWrapper>
        <Input
          title="Modelo"
          min={getPropSettings(0)?.drawable.min}
          max={getPropSettings(0)?.drawable.max}
          defaultValue={getPropDrawable(0)}
          onChange={value => handlePropDrawableChange(0, value)}
        />
        <Input
          title="Textura"
          min={getPropSettings(0)?.texture.min}
          max={getPropSettings(0)?.texture.max}
          defaultValue={getPropTexture(0)}
          onChange={value => handlePropTextureChange(0, value)}
        />
      </FlexWrapper>
    </Item>
    <Item title="Óculos">
      <FlexWrapper>
        <Input
          title="Modelo"
          min={getPropSettings(1)?.drawable.min}
          max={getPropSettings(1)?.drawable.max}
          defaultValue={getPropDrawable(1)}
          onChange={value => handlePropDrawableChange(1, value)}
        />
        <Input
          title="Textura"
          min={getPropSettings(1)?.texture.min}
          max={getPropSettings(1)?.texture.max}
          defaultValue={getPropTexture(1)}
          onChange={value => handlePropTextureChange(1, value)}
        />
      </FlexWrapper>
    </Item>
    <Item title="Orelha">
      <FlexWrapper>
        <Input
          title="Modelo"
          min={getPropSettings(2)?.drawable.min}
          max={getPropSettings(2)?.drawable.max}
          defaultValue={getPropDrawable(2)}
          onChange={value => handlePropDrawableChange(2, value)}
        />
        <Input
          title="Textura"
          min={getPropSettings(2)?.texture.min}
          max={getPropSettings(2)?.texture.max}
          defaultValue={getPropTexture(2)}
          onChange={value => handlePropTextureChange(2, value)}
        />
      </FlexWrapper>
    </Item>
    <Item title="Relógio">
      <FlexWrapper>
        <Input
          title="Modelo"
          min={getPropSettings(6)?.drawable.min}
          max={getPropSettings(6)?.drawable.max}
          defaultValue={getPropDrawable(6)}
          onChange={value => handlePropDrawableChange(6, value)}
        />
        <Input
          title="Textura"
          min={getPropSettings(6)?.texture.min}
          max={getPropSettings(6)?.texture.max}
          defaultValue={getPropTexture(6)}
          onChange={value => handlePropTextureChange(6, value)}
        />
      </FlexWrapper>
    </Item>
    <Item title="Bracelete">
      <FlexWrapper>
        <Input
          title="Modelo"
          min={getPropSettings(7)?.drawable.min}
          max={getPropSettings(7)?.drawable.max}
          defaultValue={getPropDrawable(7)}
          onChange={value => handlePropDrawableChange(7, value)}
        />
        <Input
          title="Textura"
          min={getPropSettings(7)?.texture.min}
          max={getPropSettings(7)?.texture.max}
          defaultValue={getPropTexture(7)}
          onChange={value => handlePropTextureChange(7, value)}
        />
      </FlexWrapper>
    </Item>
  </Section>
);

export default Props;
