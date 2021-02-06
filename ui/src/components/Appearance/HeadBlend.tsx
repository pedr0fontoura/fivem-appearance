import { PedHeadBlend, HeadBlendSettings } from './interfaces';

import Section from './components/Section';
import Item from './components/Item';
import Input from './components/Input';
import RangeInput from './components/RangeInput';

interface HeadBlendProps {
  settings: HeadBlendSettings;
  headBlend: PedHeadBlend;
  handleHeadBlendChange: (key: keyof PedHeadBlend, value: number) => void;
}

const HeadBlend: React.FC<HeadBlendProps> = ({ settings, headBlend, handleHeadBlendChange }) => (
  <Section title="Herança">
    <Item title="Face">
      <Input
        title="Opção A"
        min={settings.shape.min}
        max={settings.shape.max}
        defaultValue={headBlend.shapeFirst}
        clientValue={settings.shape.clientValue}
        onChange={value => handleHeadBlendChange('shapeFirst', value)}
      />
      <Input
        title="Opção B"
        min={settings.shape.min}
        max={settings.shape.max}
        defaultValue={headBlend.shapeSecond}
        clientValue={settings.shape.clientValue}
        onChange={value => handleHeadBlendChange('shapeSecond', value)}
      />
      <RangeInput
        title="Mistura"
        min={settings.mix.min}
        max={settings.mix.max}
        factor={settings.mix.factor}
        defaultValue={headBlend.shapeMix}
        clientValue={settings.mix.clientValue}
        onChange={value => handleHeadBlendChange('shapeMix', value)}
      />
    </Item>
    <Item title="Pele">
      <Input
        title="Opção A"
        min={settings.skin.min}
        max={settings.skin.max}
        defaultValue={headBlend.skinFirst}
        clientValue={settings.skin.clientValue}
        onChange={value => handleHeadBlendChange('skinFirst', value)}
      />
      <Input
        title="Opção B"
        min={settings.skin.min}
        max={settings.skin.max}
        defaultValue={headBlend.skinSecond}
        clientValue={settings.skin.clientValue}
        onChange={value => handleHeadBlendChange('skinSecond', value)}
      />
      <RangeInput
        title="Mistura"
        min={settings.mix.min}
        max={settings.mix.max}
        factor={settings.mix.factor}
        defaultValue={headBlend.skinMix}
        clientValue={settings.mix.clientValue}
        onChange={value => handleHeadBlendChange('skinMix', value)}
      />
    </Item>
  </Section>
);

export default HeadBlend;
