import { useNuiState } from '../../hooks/nuiState';

import Section from './components/Section';
import Item from './components/Item';
import Input from './components/Input';
import ColorInput from './components/ColorInput';
import RangeInput from './components/RangeInput';

import {
  HairSettings,
  HeadOverlaysSettings,
  EyeColorSettings,
  PedHair,
  PedHeadOverlays,
  PedHeadOverlayValue,
} from './interfaces';

interface HeadOverlaysProps {
  settings: {
    hair: HairSettings;
    headOverlays: HeadOverlaysSettings;
    eyeColor: EyeColorSettings;
  };
  storedData: {
    hair: PedHair;
    headOverlays: PedHeadOverlays;
    eyeColor: number;
  };
  data: {
    hair: PedHair;
    headOverlays: PedHeadOverlays;
    eyeColor: number;
  };
  handleHairChange: (key: keyof PedHair, value: number) => void;
  handleHeadOverlayChange: (key: keyof PedHeadOverlays, option: keyof PedHeadOverlayValue, value: number) => void;
  handleEyeColorChange: (value: number) => void;
}

const HeadOverlays = ({
  settings,
  storedData,
  data,
  handleHairChange,
  handleHeadOverlayChange,
  handleEyeColorChange,
}: HeadOverlaysProps) => {
  const { locales } = useNuiState();

  if (!locales) {
    return null;
  }

  return (
    <Section title={locales.headOverlays.title} deps={[settings]}>
      <Item title={locales.headOverlays.hair.title}>
        <Input
          title={locales.headOverlays.hair.style}
          min={settings.hair.style.min}
          max={settings.hair.style.max}
          defaultValue={data.hair.style}
          clientValue={storedData.hair.style}
          onChange={value => handleHairChange('style', value)}
        />
        <ColorInput
          title={locales.headOverlays.hair.color}
          colors={settings.hair.color.items}
          defaultValue={data.hair.color}
          clientValue={storedData.hair.color}
          onChange={value => handleHairChange('color', value)}
        />
        <ColorInput
          title={locales.headOverlays.hair.highlight}
          colors={settings.hair.highlight.items}
          defaultValue={data.hair.highlight}
          onChange={value => handleHairChange('highlight', value)}
        />
      </Item>
      <Item title={locales.headOverlays.blemishes}>
        <RangeInput
          title={locales.headOverlays.opacity}
          min={settings.headOverlays.blemishes.opacity.min}
          max={settings.headOverlays.blemishes.opacity.max}
          factor={settings.headOverlays.blemishes.opacity.factor}
          defaultValue={data.headOverlays.blemishes.opacity}
          clientValue={storedData.headOverlays.blemishes.opacity}
          onChange={value => handleHeadOverlayChange('blemishes', 'opacity', value)}
        />
        <Input
          title={locales.headOverlays.style}
          min={settings.headOverlays.blemishes.style.min}
          max={settings.headOverlays.blemishes.style.max}
          defaultValue={data.headOverlays.blemishes.style}
          clientValue={storedData.headOverlays.blemishes.style}
          onChange={value => handleHeadOverlayChange('blemishes', 'style', value)}
        />
      </Item>
      <Item title={locales.headOverlays.beard}>
        <RangeInput
          title={locales.headOverlays.opacity}
          min={settings.headOverlays.beard.opacity.min}
          max={settings.headOverlays.beard.opacity.max}
          factor={settings.headOverlays.beard.opacity.factor}
          defaultValue={data.headOverlays.beard.opacity}
          clientValue={storedData.headOverlays.beard.opacity}
          onChange={value => handleHeadOverlayChange('beard', 'opacity', value)}
        />
        <Input
          title={locales.headOverlays.style}
          min={settings.headOverlays.beard.style.min}
          max={settings.headOverlays.beard.style.max}
          defaultValue={data.headOverlays.beard.style}
          clientValue={storedData.headOverlays.beard.style}
          onChange={value => handleHeadOverlayChange('beard', 'style', value)}
        />
        <ColorInput
          title={locales.headOverlays.color}
          colors={settings.headOverlays.beard.color?.items}
          defaultValue={data.headOverlays.beard.color}
          clientValue={storedData.headOverlays.beard.color}
          onChange={value => handleHeadOverlayChange('beard', 'color', value)}
        />
      </Item>
      <Item title={locales.headOverlays.eyebrows}>
        <RangeInput
          title={locales.headOverlays.opacity}
          min={settings.headOverlays.eyebrows.opacity.min}
          max={settings.headOverlays.eyebrows.opacity.max}
          factor={settings.headOverlays.eyebrows.opacity.factor}
          defaultValue={data.headOverlays.eyebrows.opacity}
          clientValue={storedData.headOverlays.eyebrows.opacity}
          onChange={value => handleHeadOverlayChange('eyebrows', 'opacity', value)}
        />
        <Input
          title={locales.headOverlays.style}
          min={settings.headOverlays.eyebrows.style.min}
          max={settings.headOverlays.eyebrows.style.max}
          defaultValue={data.headOverlays.eyebrows.style}
          clientValue={storedData.headOverlays.eyebrows.style}
          onChange={value => handleHeadOverlayChange('eyebrows', 'style', value)}
        />
        <ColorInput
          title={locales.headOverlays.color}
          colors={settings.headOverlays.eyebrows.color?.items}
          defaultValue={data.headOverlays.eyebrows.color}
          clientValue={storedData.headOverlays.eyebrows.color}
          onChange={value => handleHeadOverlayChange('eyebrows', 'color', value)}
        />
      </Item>
      <Item title={locales.headOverlays.ageing}>
        <RangeInput
          title={locales.headOverlays.opacity}
          min={settings.headOverlays.ageing.opacity.min}
          max={settings.headOverlays.ageing.opacity.max}
          factor={settings.headOverlays.ageing.opacity.factor}
          defaultValue={data.headOverlays.ageing.opacity}
          clientValue={storedData.headOverlays.ageing.opacity}
          onChange={value => handleHeadOverlayChange('ageing', 'opacity', value)}
        />
        <Input
          title={locales.headOverlays.style}
          min={settings.headOverlays.ageing.style.min}
          max={settings.headOverlays.ageing.style.max}
          defaultValue={data.headOverlays.ageing.style}
          clientValue={storedData.headOverlays.ageing.style}
          onChange={value => handleHeadOverlayChange('ageing', 'style', value)}
        />
      </Item>
      <Item title={locales.headOverlays.makeUp}>
        <RangeInput
          title={locales.headOverlays.opacity}
          min={settings.headOverlays.makeUp.opacity.min}
          max={settings.headOverlays.makeUp.opacity.max}
          factor={settings.headOverlays.makeUp.opacity.factor}
          defaultValue={data.headOverlays.makeUp.opacity}
          clientValue={storedData.headOverlays.makeUp.opacity}
          onChange={value => handleHeadOverlayChange('makeUp', 'opacity', value)}
        />
        <Input
          title={locales.headOverlays.style}
          min={settings.headOverlays.makeUp.style.min}
          max={settings.headOverlays.makeUp.style.max}
          defaultValue={data.headOverlays.makeUp.style}
          clientValue={storedData.headOverlays.makeUp.style}
          onChange={value => handleHeadOverlayChange('makeUp', 'style', value)}
        />
        <ColorInput
          title={locales.headOverlays.color}
          colors={settings.headOverlays.makeUp.color?.items}
          defaultValue={data.headOverlays.makeUp.color}
          clientValue={storedData.headOverlays.makeUp.color}
          onChange={value => handleHeadOverlayChange('makeUp', 'color', value)}
        />
      </Item>
      <Item title={locales.headOverlays.blush}>
        <RangeInput
          title={locales.headOverlays.opacity}
          min={settings.headOverlays.blush.opacity.min}
          max={settings.headOverlays.blush.opacity.max}
          factor={settings.headOverlays.blush.opacity.factor}
          defaultValue={data.headOverlays.blush.opacity}
          clientValue={storedData.headOverlays.blush.opacity}
          onChange={value => handleHeadOverlayChange('blush', 'opacity', value)}
        />
        <Input
          title={locales.headOverlays.style}
          min={settings.headOverlays.blush.style.min}
          max={settings.headOverlays.blush.style.max}
          defaultValue={data.headOverlays.blush.style}
          clientValue={storedData.headOverlays.blush.style}
          onChange={value => handleHeadOverlayChange('blush', 'style', value)}
        />
        <ColorInput
          title={locales.headOverlays.color}
          colors={settings.headOverlays.blush.color?.items}
          defaultValue={data.headOverlays.blush.color}
          clientValue={storedData.headOverlays.blush.color}
          onChange={value => handleHeadOverlayChange('blush', 'color', value)}
        />
      </Item>
      <Item title={locales.headOverlays.complexion}>
        <RangeInput
          title={locales.headOverlays.opacity}
          min={settings.headOverlays.complexion.opacity.min}
          max={settings.headOverlays.complexion.opacity.max}
          factor={settings.headOverlays.complexion.opacity.factor}
          defaultValue={data.headOverlays.complexion.opacity}
          clientValue={storedData.headOverlays.complexion.opacity}
          onChange={value => handleHeadOverlayChange('complexion', 'opacity', value)}
        />
        <Input
          title={locales.headOverlays.style}
          min={settings.headOverlays.complexion.style.min}
          max={settings.headOverlays.complexion.style.max}
          defaultValue={data.headOverlays.complexion.style}
          clientValue={storedData.headOverlays.complexion.style}
          onChange={value => handleHeadOverlayChange('complexion', 'style', value)}
        />
      </Item>
      <Item title={locales.headOverlays.sunDamage}>
        <RangeInput
          title={locales.headOverlays.opacity}
          min={settings.headOverlays.sunDamage.opacity.min}
          max={settings.headOverlays.sunDamage.opacity.max}
          factor={settings.headOverlays.sunDamage.opacity.factor}
          defaultValue={data.headOverlays.sunDamage.opacity}
          clientValue={storedData.headOverlays.sunDamage.opacity}
          onChange={value => handleHeadOverlayChange('sunDamage', 'opacity', value)}
        />
        <Input
          title={locales.headOverlays.style}
          min={settings.headOverlays.sunDamage.style.min}
          max={settings.headOverlays.sunDamage.style.max}
          defaultValue={data.headOverlays.sunDamage.style}
          clientValue={storedData.headOverlays.sunDamage.style}
          onChange={value => handleHeadOverlayChange('sunDamage', 'style', value)}
        />
      </Item>
      <Item title={locales.headOverlays.lipstick}>
        <RangeInput
          title={locales.headOverlays.opacity}
          min={settings.headOverlays.lipstick.opacity.min}
          max={settings.headOverlays.lipstick.opacity.max}
          factor={settings.headOverlays.lipstick.opacity.factor}
          defaultValue={data.headOverlays.lipstick.opacity}
          clientValue={storedData.headOverlays.lipstick.opacity}
          onChange={value => handleHeadOverlayChange('lipstick', 'opacity', value)}
        />
        <Input
          title={locales.headOverlays.style}
          min={settings.headOverlays.lipstick.style.min}
          max={settings.headOverlays.lipstick.style.max}
          defaultValue={data.headOverlays.lipstick.style}
          clientValue={storedData.headOverlays.lipstick.style}
          onChange={value => handleHeadOverlayChange('lipstick', 'style', value)}
        />
        <ColorInput
          title={locales.headOverlays.color}
          colors={settings.headOverlays.lipstick.color?.items}
          defaultValue={data.headOverlays.lipstick.color}
          clientValue={storedData.headOverlays.lipstick.color}
          onChange={value => handleHeadOverlayChange('lipstick', 'color', value)}
        />
      </Item>
      <Item title={locales.headOverlays.moleAndFreckles}>
        <RangeInput
          title={locales.headOverlays.opacity}
          min={settings.headOverlays.moleAndFreckles.opacity.min}
          max={settings.headOverlays.moleAndFreckles.opacity.max}
          factor={settings.headOverlays.moleAndFreckles.opacity.factor}
          defaultValue={data.headOverlays.moleAndFreckles.opacity}
          clientValue={storedData.headOverlays.moleAndFreckles.opacity}
          onChange={value => handleHeadOverlayChange('moleAndFreckles', 'opacity', value)}
        />
        <Input
          title={locales.headOverlays.style}
          min={settings.headOverlays.moleAndFreckles.style.min}
          max={settings.headOverlays.moleAndFreckles.style.max}
          defaultValue={data.headOverlays.moleAndFreckles.style}
          clientValue={storedData.headOverlays.moleAndFreckles.style}
          onChange={value => handleHeadOverlayChange('moleAndFreckles', 'style', value)}
        />
      </Item>
      <Item title={locales.headOverlays.chestHair}>
        <RangeInput
          title={locales.headOverlays.opacity}
          min={settings.headOverlays.chestHair.opacity.min}
          max={settings.headOverlays.chestHair.opacity.max}
          factor={settings.headOverlays.chestHair.opacity.factor}
          defaultValue={data.headOverlays.chestHair.opacity}
          clientValue={storedData.headOverlays.chestHair.opacity}
          onChange={value => handleHeadOverlayChange('chestHair', 'opacity', value)}
        />
        <Input
          title={locales.headOverlays.style}
          min={settings.headOverlays.chestHair.style.min}
          max={settings.headOverlays.chestHair.style.max}
          defaultValue={data.headOverlays.chestHair.style}
          clientValue={storedData.headOverlays.chestHair.style}
          onChange={value => handleHeadOverlayChange('chestHair', 'style', value)}
        />
        <ColorInput
          title={locales.headOverlays.color}
          colors={settings.headOverlays.chestHair.color?.items}
          defaultValue={data.headOverlays.chestHair.color}
          clientValue={storedData.headOverlays.chestHair.color}
          onChange={value => handleHeadOverlayChange('chestHair', 'color', value)}
        />
      </Item>
      <Item title={locales.headOverlays.bodyBlemishes}>
        <RangeInput
          title={locales.headOverlays.opacity}
          min={settings.headOverlays.bodyBlemishes.opacity.min}
          max={settings.headOverlays.bodyBlemishes.opacity.max}
          factor={settings.headOverlays.bodyBlemishes.opacity.factor}
          defaultValue={data.headOverlays.bodyBlemishes.opacity}
          clientValue={storedData.headOverlays.bodyBlemishes.opacity}
          onChange={value => handleHeadOverlayChange('bodyBlemishes', 'opacity', value)}
        />
        <Input
          title={locales.headOverlays.style}
          min={settings.headOverlays.bodyBlemishes.style.min}
          max={settings.headOverlays.bodyBlemishes.style.max}
          defaultValue={data.headOverlays.bodyBlemishes.style}
          clientValue={storedData.headOverlays.bodyBlemishes.style}
          onChange={value => handleHeadOverlayChange('bodyBlemishes', 'style', value)}
        />
      </Item>
      <Item title={locales.headOverlays.eyeColor}>
        <Input
          title={locales.headOverlays.style}
          min={settings.eyeColor.min}
          max={settings.eyeColor.max}
          defaultValue={data.eyeColor}
          clientValue={storedData.eyeColor}
          onChange={value => handleEyeColorChange(value)}
        />
      </Item>
    </Section>
  );
};

export default HeadOverlays;
