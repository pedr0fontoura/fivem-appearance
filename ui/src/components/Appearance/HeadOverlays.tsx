import {
  HairSettings,
  HeadOverlaysSettings,
  EyeColorSettings,
  PedHair,
  PedHeadOverlays,
  PedHeadOverlayValue,
} from './interfaces';

import Section from './components/Section';
import Item from './components/Item';
import Input from './components/Input';
import ColorInput from './components/ColorInput';
import RangeInput from './components/RangeInput';

interface HeadOverlaysProps {
  settings: {
    hair: HairSettings;
    headOverlays: HeadOverlaysSettings;
    eyeColor: EyeColorSettings;
  };
  hair: PedHair;
  headOverlays: PedHeadOverlays;
  eyeColor: number;
  handleHairChange: (key: keyof PedHair, value: number) => void;
  handleHeadOverlayChange: (key: keyof PedHeadOverlays, option: keyof PedHeadOverlayValue, value: number) => void;
  handleEyeColorChange: (value: number) => void;
}

const HeadOverlays: React.FC<HeadOverlaysProps> = ({
  settings,
  hair,
  headOverlays,
  eyeColor,
  handleHairChange,
  handleHeadOverlayChange,
  handleEyeColorChange,
}) => (
  <Section title="Aparência">
    <Item title="Cabelo">
      <Input
        title="Estilo"
        min={settings.hair.style.min}
        max={settings.hair.style.max}
        defaultValue={hair.style}
        onChange={value => handleHairChange('style', value)}
      />
      <ColorInput
        title="Cor"
        colors={settings.hair.colors}
        defaultValue={hair.color}
        onChange={value => handleHairChange('color', value)}
      />
      <ColorInput
        title="Reflexo"
        colors={settings.hair.highlights}
        defaultValue={hair.highlight}
        onChange={value => handleHairChange('highlight', value)}
      />
    </Item>
    <Item title="Manchas">
      <RangeInput
        title="Opacidade"
        min={settings.headOverlays.blemishes.opacity.min}
        max={settings.headOverlays.blemishes.opacity.max}
        factor={settings.headOverlays.blemishes.opacity.factor}
        defaultValue={headOverlays.blemishes.opacity}
        onChange={value => handleHeadOverlayChange('blemishes', 'opacity', value)}
      />
      <Input
        title="Estilo"
        min={settings.headOverlays.blemishes.style.min}
        max={settings.headOverlays.blemishes.style.max}
        defaultValue={headOverlays.blemishes.style}
        onChange={value => handleHeadOverlayChange('blemishes', 'style', value)}
      />
    </Item>
    <Item title="Barba">
      <RangeInput
        title="Opacidade"
        min={settings.headOverlays.beard.opacity.min}
        max={settings.headOverlays.beard.opacity.max}
        factor={settings.headOverlays.beard.opacity.factor}
        defaultValue={headOverlays.beard.opacity}
        onChange={value => handleHeadOverlayChange('beard', 'opacity', value)}
      />
      <Input
        title="Estilo"
        min={settings.headOverlays.beard.style.min}
        max={settings.headOverlays.beard.style.max}
        defaultValue={headOverlays.beard.style}
        onChange={value => handleHeadOverlayChange('beard', 'style', value)}
      />
      <ColorInput
        title="Cor"
        colors={settings.headOverlays.beard.colors}
        defaultValue={headOverlays.beard.color}
        onChange={value => handleHeadOverlayChange('beard', 'color', value)}
      />
    </Item>
    <Item title="Sobrancelha">
      <RangeInput
        title="Opacidade"
        min={settings.headOverlays.eyebrows.opacity.min}
        max={settings.headOverlays.eyebrows.opacity.max}
        factor={settings.headOverlays.eyebrows.opacity.factor}
        defaultValue={headOverlays.eyebrows.opacity}
        onChange={value => handleHeadOverlayChange('eyebrows', 'opacity', value)}
      />
      <Input
        title="Estilo"
        min={settings.headOverlays.eyebrows.style.min}
        max={settings.headOverlays.eyebrows.style.max}
        defaultValue={headOverlays.eyebrows.style}
        onChange={value => handleHeadOverlayChange('eyebrows', 'style', value)}
      />
      <ColorInput
        title="Cor"
        colors={settings.headOverlays.eyebrows.colors}
        defaultValue={headOverlays.eyebrows.color}
        onChange={value => handleHeadOverlayChange('eyebrows', 'color', value)}
      />
    </Item>
    <Item title="Envelhecimento">
      <RangeInput
        title="Opacidade"
        min={settings.headOverlays.ageing.opacity.min}
        max={settings.headOverlays.ageing.opacity.max}
        factor={settings.headOverlays.ageing.opacity.factor}
        defaultValue={headOverlays.ageing.opacity}
        onChange={value => handleHeadOverlayChange('ageing', 'opacity', value)}
      />
      <Input
        title="Estilo"
        min={settings.headOverlays.ageing.style.min}
        max={settings.headOverlays.ageing.style.max}
        defaultValue={headOverlays.ageing.style}
        onChange={value => handleHeadOverlayChange('ageing', 'style', value)}
      />
    </Item>
    <Item title="Maquiagem">
      <RangeInput
        title="Opacidade"
        min={settings.headOverlays.makeUp.opacity.min}
        max={settings.headOverlays.makeUp.opacity.max}
        factor={settings.headOverlays.makeUp.opacity.factor}
        defaultValue={headOverlays.makeUp.opacity}
        onChange={value => handleHeadOverlayChange('makeUp', 'opacity', value)}
      />
      <Input
        title="Estilo"
        min={settings.headOverlays.makeUp.style.min}
        max={settings.headOverlays.makeUp.style.max}
        defaultValue={headOverlays.makeUp.style}
        onChange={value => handleHeadOverlayChange('makeUp', 'style', value)}
      />
      <ColorInput
        title="Cor"
        colors={settings.headOverlays.makeUp.colors}
        defaultValue={headOverlays.makeUp.color}
        onChange={value => handleHeadOverlayChange('makeUp', 'color', value)}
      />
    </Item>
    <Item title="Blush">
      <RangeInput
        title="Opacidade"
        min={settings.headOverlays.blush.opacity.min}
        max={settings.headOverlays.blush.opacity.max}
        factor={settings.headOverlays.blush.opacity.factor}
        defaultValue={headOverlays.blush.opacity}
        onChange={value => handleHeadOverlayChange('blush', 'opacity', value)}
      />
      <Input
        title="Estilo"
        min={settings.headOverlays.blush.style.min}
        max={settings.headOverlays.blush.style.max}
        defaultValue={headOverlays.blush.style}
        onChange={value => handleHeadOverlayChange('blush', 'style', value)}
      />
      <ColorInput
        title="Cor"
        colors={settings.headOverlays.blush.colors}
        defaultValue={headOverlays.blush.color}
        onChange={value => handleHeadOverlayChange('blush', 'color', value)}
      />
    </Item>
    <Item title="Aspecto da pele">
      <RangeInput
        title="Opacidade"
        min={settings.headOverlays.complexion.opacity.min}
        max={settings.headOverlays.complexion.opacity.max}
        factor={settings.headOverlays.complexion.opacity.factor}
        defaultValue={headOverlays.complexion.opacity}
        onChange={value => handleHeadOverlayChange('complexion', 'opacity', value)}
      />
      <Input
        title="Estilo"
        min={settings.headOverlays.complexion.style.min}
        max={settings.headOverlays.complexion.style.max}
        defaultValue={headOverlays.complexion.style}
        onChange={value => handleHeadOverlayChange('complexion', 'style', value)}
      />
    </Item>
    <Item title="Dano solar">
      <RangeInput
        title="Opacidade"
        min={settings.headOverlays.sunDamage.opacity.min}
        max={settings.headOverlays.sunDamage.opacity.max}
        factor={settings.headOverlays.sunDamage.opacity.factor}
        defaultValue={headOverlays.sunDamage.opacity}
        onChange={value => handleHeadOverlayChange('sunDamage', 'opacity', value)}
      />
      <Input
        title="Estilo"
        min={settings.headOverlays.sunDamage.style.min}
        max={settings.headOverlays.sunDamage.style.max}
        defaultValue={headOverlays.sunDamage.style}
        onChange={value => handleHeadOverlayChange('sunDamage', 'style', value)}
      />
    </Item>
    <Item title="Batom">
      <RangeInput
        title="Opacidade"
        min={settings.headOverlays.lipstick.opacity.min}
        max={settings.headOverlays.lipstick.opacity.max}
        factor={settings.headOverlays.lipstick.opacity.factor}
        defaultValue={headOverlays.lipstick.opacity}
        onChange={value => handleHeadOverlayChange('lipstick', 'opacity', value)}
      />
      <Input
        title="Estilo"
        min={settings.headOverlays.lipstick.style.min}
        max={settings.headOverlays.lipstick.style.max}
        defaultValue={headOverlays.lipstick.style}
        onChange={value => handleHeadOverlayChange('lipstick', 'style', value)}
      />
      <ColorInput
        title="Cor"
        colors={settings.headOverlays.lipstick.colors}
        defaultValue={headOverlays.lipstick.color}
        onChange={value => handleHeadOverlayChange('lipstick', 'color', value)}
      />
    </Item>
    <Item title="Pintas e sardas">
      <RangeInput
        title="Opacidade"
        min={settings.headOverlays.moleAndFreckles.opacity.min}
        max={settings.headOverlays.moleAndFreckles.opacity.max}
        factor={settings.headOverlays.moleAndFreckles.opacity.factor}
        defaultValue={headOverlays.moleAndFreckles.opacity}
        onChange={value => handleHeadOverlayChange('moleAndFreckles', 'opacity', value)}
      />
      <Input
        title="Estilo"
        min={settings.headOverlays.moleAndFreckles.style.min}
        max={settings.headOverlays.moleAndFreckles.style.max}
        defaultValue={headOverlays.moleAndFreckles.style}
        onChange={value => handleHeadOverlayChange('moleAndFreckles', 'style', value)}
      />
    </Item>
    <Item title="Cabelo do peito">
      <RangeInput
        title="Opacidade"
        min={settings.headOverlays.chestHair.opacity.min}
        max={settings.headOverlays.chestHair.opacity.max}
        factor={settings.headOverlays.chestHair.opacity.factor}
        defaultValue={headOverlays.chestHair.opacity}
        onChange={value => handleHeadOverlayChange('chestHair', 'opacity', value)}
      />
      <Input
        title="Estilo"
        min={settings.headOverlays.chestHair.style.min}
        max={settings.headOverlays.chestHair.style.max}
        defaultValue={headOverlays.chestHair.style}
        onChange={value => handleHeadOverlayChange('chestHair', 'style', value)}
      />
      <ColorInput
        title="Cor"
        colors={settings.headOverlays.chestHair.colors}
        defaultValue={headOverlays.chestHair.color}
        onChange={value => handleHeadOverlayChange('chestHair', 'color', value)}
      />
    </Item>
    <Item title="Manchas Corporais">
      <RangeInput
        title="Opacidade"
        min={settings.headOverlays.bodyBlemishes.opacity.min}
        max={settings.headOverlays.bodyBlemishes.opacity.max}
        factor={settings.headOverlays.bodyBlemishes.opacity.factor}
        defaultValue={headOverlays.bodyBlemishes.opacity}
        onChange={value => handleHeadOverlayChange('bodyBlemishes', 'opacity', value)}
      />
      <Input
        title="Estilo"
        min={settings.headOverlays.bodyBlemishes.style.min}
        max={settings.headOverlays.bodyBlemishes.style.max}
        defaultValue={headOverlays.bodyBlemishes.style}
        onChange={value => handleHeadOverlayChange('bodyBlemishes', 'style', value)}
      />
    </Item>
    <Item title="Cor dos olhos">
      <Input
        title="Estilo"
        min={settings.eyeColor.min}
        max={settings.eyeColor.max}
        defaultValue={eyeColor}
        onChange={value => handleEyeColorChange(value)}
      />
    </Item>
  </Section>
);

export default HeadOverlays;
