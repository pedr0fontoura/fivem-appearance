import { useNuiState } from '../../hooks/nuiState';

import Section from './components/Section';
import Item from './components/Item';
import Input from './components/Input';
import RangeInput from './components/RangeInput';

import { PedHeadBlend, HeadBlendSettings } from './interfaces';

interface HeadBlendProps {
  settings: HeadBlendSettings;
  storedData: PedHeadBlend;
  data: PedHeadBlend;
  handleHeadBlendChange: (key: keyof PedHeadBlend, value: number) => void;
}

const HeadBlend = ({ settings, storedData, data, handleHeadBlendChange }: HeadBlendProps) => {
  const { locales } = useNuiState();

  if (!locales) {
    return null;
  }

  return (
    <Section title={locales.headBlend.title}>
      <Item title={locales.headBlend.shape.title}>
        <Input
          title={locales.headBlend.shape.firstOption}
          min={settings.shapeFirst.min}
          max={settings.shapeFirst.max}
          defaultValue={data.shapeFirst}
          clientValue={storedData.shapeFirst}
          onChange={value => handleHeadBlendChange('shapeFirst', value)}
        />
        <Input
          title={locales.headBlend.shape.secondOption}
          min={settings.shapeSecond.min}
          max={settings.shapeSecond.max}
          defaultValue={data.shapeSecond}
          clientValue={storedData.shapeSecond}
          onChange={value => handleHeadBlendChange('shapeSecond', value)}
        />
        <RangeInput
          title={locales.headBlend.shape.mix}
          min={settings.shapeMix.min}
          max={settings.shapeMix.max}
          factor={settings.shapeMix.factor}
          defaultValue={data.shapeMix}
          clientValue={storedData.shapeMix}
          onChange={value => handleHeadBlendChange('shapeMix', value)}
        />
      </Item>
      <Item title={locales.headBlend.skin.title}>
        <Input
          title={locales.headBlend.skin.firstOption}
          min={settings.skinFirst.min}
          max={settings.skinFirst.max}
          defaultValue={data.skinFirst}
          clientValue={storedData.skinFirst}
          onChange={value => handleHeadBlendChange('skinFirst', value)}
        />
        <Input
          title={locales.headBlend.skin.secondOption}
          min={settings.skinSecond.min}
          max={settings.skinSecond.max}
          defaultValue={data.skinSecond}
          clientValue={storedData.skinSecond}
          onChange={value => handleHeadBlendChange('skinSecond', value)}
        />
        <RangeInput
          title={locales.headBlend.skin.mix}
          min={settings.skinMix.min}
          max={settings.skinMix.max}
          factor={settings.skinMix.factor}
          defaultValue={data.skinMix}
          clientValue={storedData.skinMix}
          onChange={value => handleHeadBlendChange('skinMix', value)}
        />
      </Item>
    </Section>
  );
};

export default HeadBlend;
