import { useState, useEffect, useCallback } from 'react';
import { useNuiState } from '../../hooks/nuiState';
import Nui from '../../Nui';

import { PedHeadBlend, PedFaceFeatures, PedHeadOverlays, PedHeadOverlayValue, PedHair } from './interfaces';

import { APPEARANCE_INITIAL_STATE, SETTINGS_INITIAL_STATE } from './settings';

import Options from './Options';
import Section from './Section';
import Item from './Item';
import ListInput from './ListInput';
import Input from './Input';
import RangeInput from './RangeInput';
import ColorInput from './ColorInput';

import { Wrapper, Container, FlexWrapper } from './styles';

const Appearance: React.FC = () => {
  const [data, setData] = useState(APPEARANCE_INITIAL_STATE);
  const [settings, setSettings] = useState(SETTINGS_INITIAL_STATE);

  const { display } = useNuiState();

  const { model, components, props, headBlend, faceFeatures, headOverlays, hair, eyeColor } = data;

  const getComponentSettings = useCallback(
    (component_id: number) => {
      return settings.components.find(c => c.component_id === component_id);
    },
    [settings.components],
  );

  const getPropSettings = useCallback(
    (prop_id: number) => {
      return settings.props.find(p => p.prop_id === prop_id);
    },
    [settings.props],
  );

  const getComponentDrawable = useCallback(
    (component_id: number) => {
      return components.find(c => c.component_id === component_id)?.drawable;
    },
    [components],
  );

  const getComponentTexture = useCallback(
    (component_id: number) => {
      return components.find(c => c.component_id === component_id)?.texture;
    },
    [components],
  );

  const getPropDrawable = useCallback(
    (prop_id: number) => {
      return props.find(p => p.prop_id === prop_id)?.drawable;
    },
    [props],
  );

  const getPropTexture = useCallback(
    (prop_id: number) => {
      return props.find(p => p.prop_id === prop_id)?.texture;
    },
    [props],
  );

  const handleModelChange = useCallback(
    (value: string) => {
      setData(state => ({
        ...state,
        model: value,
      }));
    },
    [setData],
  );

  const handleHeadBlendChange = useCallback(
    (key: keyof PedHeadBlend, value: number) => {
      setData(state => ({
        ...state,
        headBlend: {
          ...state.headBlend,
          [key]: value,
        },
      }));
    },
    [setData],
  );

  const handleFaceFeatureChange = useCallback(
    (key: keyof PedFaceFeatures, value: number) => {
      setData(state => ({
        ...state,
        faceFeatures: {
          ...state.faceFeatures,
          [key]: value,
        },
      }));
    },
    [setData],
  );

  const handleHairChange = useCallback(
    (key: keyof PedHair, value: number) => {
      setData(state => ({
        ...state,
        hair: {
          ...state.hair,
          [key]: value,
        },
      }));
    },
    [setData],
  );

  const handleHeadOverlayChange = useCallback(
    (key: keyof PedHeadOverlays, option: keyof PedHeadOverlayValue, value: number) => {
      setData(state => ({
        ...state,
        headOverlays: {
          ...state.headOverlays,
          [key]: {
            ...[key],
            [option]: value,
          },
        },
      }));
    },
    [setData],
  );

  const handleEyeColorChange = useCallback(
    (value: number) => {
      setData(state => ({
        ...state,
        eyeColor: value,
      }));
    },
    [setData],
  );

  const handleComponentDrawableChange = useCallback(
    (component_id: number, drawable: number) => {
      setData(state => {
        const component = state.components.find(c => c.component_id === component_id);

        if (!component) return state;

        const filteredComponents = state.components.filter(c => c.component_id !== component_id);

        const updatedComponents = [...filteredComponents, { ...component, drawable }];

        return {
          ...state,
          components: updatedComponents,
        };
      });
    },
    [setData],
  );

  const handleComponentTextureChange = useCallback(
    (component_id: number, texture: number) => {
      setData(state => {
        const component = state.components.find(c => c.component_id === component_id);

        if (!component) return state;

        const filteredComponents = state.components.filter(c => c.component_id !== component_id);

        const updatedComponents = [...filteredComponents, { ...component, texture }];

        return {
          ...state,
          components: updatedComponents,
        };
      });
    },
    [setData],
  );

  const handlePropDrawableChange = useCallback(
    (prop_id: number, drawable: number) => {
      setData(state => {
        const component = state.props.find(c => c.prop_id === prop_id);

        if (!component) return state;

        const filteredComponents = state.props.filter(c => c.prop_id !== prop_id);

        const updatedComponents = [...filteredComponents, { ...component, drawable }];

        return {
          ...state,
          props: updatedComponents,
        };
      });
    },
    [setData],
  );

  const handlePropTextureChange = useCallback(
    (prop_id: number, texture: number) => {
      setData(state => {
        const component = state.props.find(c => c.prop_id === prop_id);

        if (!component) return state;

        const filteredComponents = state.props.filter(c => c.prop_id !== prop_id);

        const updatedComponents = [...filteredComponents, { ...component, texture }];

        return {
          ...state,
          props: updatedComponents,
        };
      });
    },
    [setData],
  );

  if (!display.appearance) {
    return null;
  }

  return (
    <Wrapper>
      <Container>
        <Section title="Ped">
          <Item>
            <ListInput
              title="Model"
              items={['mp_m_freemode_01', 'mp_f_freemode_01']}
              defaultValue={model}
              onChange={value => handleModelChange(value)}
            />
          </Item>
        </Section>
        <Section title="Herança">
          <Item title="Face">
            <Input
              title="Opção A"
              min={settings.headBlend.shape.min}
              max={settings.headBlend.shape.max}
              defaultValue={headBlend.shapeFirst}
              onChange={value => handleHeadBlendChange('shapeFirst', value)}
            />
            <Input
              title="Opção B"
              min={settings.headBlend.shape.min}
              max={settings.headBlend.shape.max}
              defaultValue={headBlend.shapeSecond}
              onChange={value => handleHeadBlendChange('shapeSecond', value)}
            />
            <RangeInput
              title="Mistura"
              min={settings.headBlend.mix.min}
              max={settings.headBlend.mix.max}
              factor={settings.headBlend.mix.factor}
              defaultValue={headBlend.shapeMix}
              onChange={value => handleHeadBlendChange('shapeMix', value)}
            />
          </Item>
          <Item title="Pele">
            <Input
              title="Opção A"
              min={settings.headBlend.skin.min}
              max={settings.headBlend.skin.max}
              defaultValue={headBlend.skinFirst}
              onChange={value => handleHeadBlendChange('skinFirst', value)}
            />
            <Input
              title="Opção B"
              min={settings.headBlend.skin.min}
              max={settings.headBlend.skin.max}
              defaultValue={headBlend.skinSecond}
              onChange={value => handleHeadBlendChange('skinSecond', value)}
            />
            <RangeInput
              title="Mistura"
              min={settings.headBlend.mix.min}
              max={settings.headBlend.mix.max}
              factor={settings.headBlend.mix.factor}
              defaultValue={headBlend.skinMix}
              onChange={value => handleHeadBlendChange('skinMix', value)}
            />
          </Item>
        </Section>
        <Section title="Características faciais">
          <Item title="Nariz">
            <RangeInput
              title="Largura"
              min={settings.faceFeatures.min}
              max={settings.faceFeatures.max}
              factor={settings.faceFeatures.factor}
              defaultValue={faceFeatures.noseWidth}
              onChange={value => handleFaceFeatureChange('noseWidth', value)}
            />
            <RangeInput
              title="Altura"
              min={settings.faceFeatures.min}
              max={settings.faceFeatures.max}
              factor={settings.faceFeatures.factor}
              defaultValue={faceFeatures.nosePeakHigh}
              onChange={value => handleFaceFeatureChange('nosePeakHigh', value)}
            />
            <RangeInput
              title="Tamanho"
              min={settings.faceFeatures.min}
              max={settings.faceFeatures.max}
              factor={settings.faceFeatures.factor}
              defaultValue={faceFeatures.nosePeakSize}
              onChange={value => handleFaceFeatureChange('nosePeakSize', value)}
            />
            <RangeInput
              title="Altura do osso"
              min={settings.faceFeatures.min}
              max={settings.faceFeatures.max}
              factor={settings.faceFeatures.factor}
              defaultValue={faceFeatures.noseBoneHigh}
              onChange={value => handleFaceFeatureChange('noseBoneHigh', value)}
            />
            <RangeInput
              title="Altura da ponta"
              min={settings.faceFeatures.min}
              max={settings.faceFeatures.max}
              factor={settings.faceFeatures.factor}
              defaultValue={faceFeatures.nosePeakLowering}
              onChange={value => handleFaceFeatureChange('nosePeakLowering', value)}
            />
            <RangeInput
              title="Deslocamento"
              min={settings.faceFeatures.min}
              max={settings.faceFeatures.max}
              factor={settings.faceFeatures.factor}
              defaultValue={faceFeatures.noseBoneTwist}
              onChange={value => handleFaceFeatureChange('noseBoneTwist', value)}
            />
          </Item>
          <Item title="Sobrancelha">
            <RangeInput
              title="Altura"
              min={settings.faceFeatures.min}
              max={settings.faceFeatures.max}
              factor={settings.faceFeatures.factor}
              defaultValue={faceFeatures.eyeBrownHigh}
              onChange={value => handleFaceFeatureChange('eyeBrownHigh', value)}
            />
            <RangeInput
              title="Profundidade"
              min={settings.faceFeatures.min}
              max={settings.faceFeatures.max}
              factor={settings.faceFeatures.factor}
              defaultValue={faceFeatures.eyeBrownForward}
              onChange={value => handleFaceFeatureChange('eyeBrownForward', value)}
            />
          </Item>
          <Item title="Bochecha">
            <RangeInput
              title="Altura da maçã do rosto"
              min={settings.faceFeatures.min}
              max={settings.faceFeatures.max}
              factor={settings.faceFeatures.factor}
              defaultValue={faceFeatures.cheeksBoneHigh}
              onChange={value => handleFaceFeatureChange('cheeksBoneHigh', value)}
            />
            <RangeInput
              title="Largura da maçã do rosto"
              min={-10}
              max={10}
              factor={0.1}
              defaultValue={faceFeatures.cheeksBoneWidth}
              onChange={value => handleFaceFeatureChange('cheeksBoneWidth', value)}
            />
            <RangeInput
              title="Largura"
              min={settings.faceFeatures.min}
              max={settings.faceFeatures.max}
              factor={settings.faceFeatures.factor}
              defaultValue={faceFeatures.cheeksWidth}
              onChange={value => handleFaceFeatureChange('cheeksWidth', value)}
            />
          </Item>
          <Item title="Olhos e boca">
            <RangeInput
              title="Abertura dos olhos"
              min={settings.faceFeatures.min}
              max={settings.faceFeatures.max}
              factor={settings.faceFeatures.factor}
              defaultValue={faceFeatures.eyesOpening}
              onChange={value => handleFaceFeatureChange('eyesOpening', value)}
            />
            <RangeInput
              title="Espessura dos lábios"
              min={settings.faceFeatures.min}
              max={settings.faceFeatures.max}
              factor={settings.faceFeatures.factor}
              defaultValue={faceFeatures.lipsThickness}
              onChange={value => handleFaceFeatureChange('lipsThickness', value)}
            />
          </Item>
          <Item title="Mandíbula">
            <RangeInput
              title="Largura"
              min={settings.faceFeatures.min}
              max={settings.faceFeatures.max}
              factor={settings.faceFeatures.factor}
              defaultValue={faceFeatures.jawBoneWidth}
              onChange={value => handleFaceFeatureChange('jawBoneWidth', value)}
            />
            <RangeInput
              title="Tamanho"
              min={settings.faceFeatures.min}
              max={settings.faceFeatures.max}
              factor={settings.faceFeatures.factor}
              defaultValue={faceFeatures.jawBoneBackSize}
              onChange={value => handleFaceFeatureChange('jawBoneBackSize', value)}
            />
          </Item>
          <Item title="Queixo">
            <RangeInput
              title="Altura"
              min={settings.faceFeatures.min}
              max={settings.faceFeatures.max}
              factor={settings.faceFeatures.factor}
              defaultValue={faceFeatures.chinBoneLowering}
              onChange={value => handleFaceFeatureChange('chinBoneLowering', value)}
            />
            <RangeInput
              title="Tamanho"
              min={settings.faceFeatures.min}
              max={settings.faceFeatures.max}
              factor={settings.faceFeatures.factor}
              defaultValue={faceFeatures.chinBoneLenght}
              onChange={value => handleFaceFeatureChange('chinBoneLenght', value)}
            />
            <RangeInput
              title="Largura"
              min={settings.faceFeatures.min}
              max={settings.faceFeatures.max}
              factor={settings.faceFeatures.factor}
              defaultValue={faceFeatures.chinBoneSize}
              onChange={value => handleFaceFeatureChange('chinBoneSize', value)}
            />
            <RangeInput
              title="Tamanho do furo"
              min={settings.faceFeatures.min}
              max={settings.faceFeatures.max}
              factor={settings.faceFeatures.factor}
              defaultValue={faceFeatures.chinHole}
              onChange={value => handleFaceFeatureChange('chinHole', value)}
            />
          </Item>
          <Item title="Pescoço">
            <RangeInput
              title="Espessura"
              min={settings.faceFeatures.min}
              max={settings.faceFeatures.max}
              factor={settings.faceFeatures.factor}
              defaultValue={faceFeatures.neckThickness}
              onChange={value => handleFaceFeatureChange('neckThickness', value)}
            />
          </Item>
        </Section>
        <Section title="Aparência">
          <Item title="Cabelo">
            <Input
              title="Estilo"
              min={settings.hair.style.min}
              max={settings.hair.style.min}
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
        <Section title="Vestuário">
          <Item title="Máscara">
            <FlexWrapper>
              <Input
                title="Modelo"
                min={getComponentSettings(1)?.drawable.min}
                max={getComponentSettings(1)?.drawable.max}
                defaultValue={getComponentDrawable(1)}
                onChange={value => handleComponentDrawableChange(1, value)}
              />
              <Input
                title="Textura"
                min={getComponentSettings(1)?.texture.min}
                max={getComponentSettings(1)?.texture.max}
                defaultValue={getComponentTexture(1)}
                onChange={value => handleComponentTextureChange(1, value)}
              />
            </FlexWrapper>
          </Item>
          <Item title="Mãos">
            <FlexWrapper>
              <Input
                title="Modelo"
                min={getComponentSettings(3)?.drawable.min}
                max={getComponentSettings(3)?.drawable.max}
                defaultValue={getComponentDrawable(3)}
                onChange={value => handleComponentDrawableChange(3, value)}
              />
              <Input
                title="Textura"
                min={getComponentSettings(3)?.texture.min}
                max={getComponentSettings(3)?.texture.max}
                defaultValue={getComponentTexture(3)}
                onChange={value => handleComponentTextureChange(3, value)}
              />
            </FlexWrapper>
          </Item>
          <Item title="Pernas">
            <FlexWrapper>
              <Input
                title="Modelo"
                min={getComponentSettings(4)?.drawable.min}
                max={getComponentSettings(4)?.texture.max}
                defaultValue={getComponentDrawable(4)}
                onChange={value => handleComponentDrawableChange(4, value)}
              />
              <Input
                title="Textura"
                min={getComponentSettings(4)?.texture.min}
                max={getComponentSettings(4)?.texture.max}
                defaultValue={getComponentTexture(4)}
                onChange={value => handleComponentTextureChange(4, value)}
              />
            </FlexWrapper>
          </Item>
          <Item title="Mochila">
            <FlexWrapper>
              <Input
                title="Modelo"
                min={getComponentSettings(5)?.drawable.min}
                max={getComponentSettings(5)?.drawable.max}
                defaultValue={getComponentDrawable(5)}
                onChange={value => handleComponentDrawableChange(5, value)}
              />
              <Input
                title="Textura"
                min={getComponentSettings(5)?.texture.min}
                max={getComponentSettings(5)?.texture.max}
                defaultValue={getComponentTexture(5)}
                onChange={value => handleComponentTextureChange(5, value)}
              />
            </FlexWrapper>
          </Item>
          <Item title="Calçados">
            <FlexWrapper>
              <Input
                title="Modelo"
                min={getComponentSettings(6)?.drawable.min}
                max={getComponentSettings(6)?.drawable.max}
                defaultValue={getComponentDrawable(6)}
                onChange={value => handleComponentDrawableChange(6, value)}
              />
              <Input
                title="Textura"
                min={getComponentSettings(6)?.texture.min}
                max={getComponentSettings(6)?.texture.max}
                defaultValue={getComponentTexture(6)}
                onChange={value => handleComponentTextureChange(6, value)}
              />
            </FlexWrapper>
          </Item>
          <Item title="Acessórios">
            <FlexWrapper>
              <Input
                title="Modelo"
                min={getComponentSettings(7)?.drawable.min}
                max={getComponentSettings(7)?.drawable.max}
                defaultValue={getComponentDrawable(7)}
                onChange={value => handleComponentDrawableChange(7, value)}
              />
              <Input
                title="Textura"
                min={getComponentSettings(7)?.texture.min}
                max={getComponentSettings(7)?.texture.max}
                defaultValue={getComponentTexture(7)}
                onChange={value => handleComponentTextureChange(7, value)}
              />
            </FlexWrapper>
          </Item>
          <Item title="Camisa">
            <FlexWrapper>
              <Input
                title="Modelo"
                min={getComponentSettings(8)?.drawable.min}
                max={getComponentSettings(8)?.drawable.max}
                defaultValue={getComponentDrawable(8)}
                onChange={value => handleComponentDrawableChange(8, value)}
              />
              <Input
                title="Textura"
                min={getComponentSettings(8)?.texture.min}
                max={getComponentSettings(8)?.texture.max}
                defaultValue={getComponentTexture(8)}
                onChange={value => handleComponentTextureChange(8, value)}
              />
            </FlexWrapper>
          </Item>
          <Item title="Coletes">
            <FlexWrapper>
              <Input
                title="Modelo"
                min={getComponentSettings(9)?.drawable.min}
                max={getComponentSettings(9)?.drawable.max}
                defaultValue={getComponentDrawable(9)}
                onChange={value => handleComponentDrawableChange(9, value)}
              />
              <Input
                title="Textura"
                min={getComponentSettings(9)?.texture.min}
                max={getComponentSettings(9)?.texture.max}
                defaultValue={getComponentTexture(9)}
                onChange={value => handleComponentTextureChange(9, value)}
              />
            </FlexWrapper>
          </Item>
          <Item title="Emblemas">
            <FlexWrapper>
              <Input
                title="Modelo"
                min={getComponentSettings(10)?.drawable.min}
                max={getComponentSettings(10)?.drawable.max}
                defaultValue={getComponentDrawable(10)}
                onChange={value => handleComponentDrawableChange(10, value)}
              />
              <Input
                title="Textura"
                min={getComponentSettings(10)?.texture.min}
                max={getComponentSettings(10)?.texture.max}
                defaultValue={getComponentTexture(10)}
                onChange={value => handleComponentTextureChange(10, value)}
              />
            </FlexWrapper>
          </Item>
          <Item title="Jaquetas">
            <FlexWrapper>
              <Input
                title="Modelo"
                min={getComponentSettings(11)?.drawable.min}
                max={getComponentSettings(11)?.drawable.max}
                defaultValue={getComponentDrawable(11)}
                onChange={value => handleComponentDrawableChange(11, value)}
              />
              <Input
                title="Textura"
                min={getComponentSettings(11)?.texture.min}
                max={getComponentSettings(11)?.texture.max}
                defaultValue={getComponentTexture(11)}
                onChange={value => handleComponentTextureChange(11, value)}
              />
            </FlexWrapper>
          </Item>
        </Section>
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
      </Container>
      <Options />
    </Wrapper>
  );
};

export default Appearance;
