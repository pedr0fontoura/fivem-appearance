import { useState, useEffect, useCallback } from 'react';
import { useNuiState } from '../../hooks/nuiState';
import Nui from '../../Nui';

import { PedHeadBlend, PedFaceFeatures, PedHeadOverlays, PedHeadOverlayValue, PedHair } from './interfaces';

import { APPEARANCE_INITIAL_STATE } from './defaults';

import Options from './Options';
import Section from './Section';
import Item from './Item';
import ListInput from './ListInput';
import Input from './Input';
import RangeInput from './RangeInput';
import ColorInput from './ColorInput';

import { Wrapper, Container, FlexWrapper } from './styles';

const colors = [
  [255, 0, 0],
  [0, 255, 0],
  [0, 0, 255],
];

const Appearance: React.FC = () => {
  const [data, setData] = useState(APPEARANCE_INITIAL_STATE);

  const { display } = useNuiState();

  const { model, components, props, headBlend, faceFeatures, headOverlays, hair, eyeColor } = data;

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
      return props.find(c => c.prop_id === prop_id)?.drawable;
    },
    [props],
  );

  const getPropTexture = useCallback(
    (prop_id: number) => {
      return props.find(c => c.prop_id === prop_id)?.texture;
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
          <Item title="Model">
            <ListInput
              items={['mp_m_freemode_01', 'mp_f_freemode_01']}
              default={model}
              onChange={value => handleModelChange(value)}
            />
          </Item>
        </Section>
        <Section title="Herança">
          <Item title="Face">
            <Input
              title="Opção A"
              min={0}
              max={45}
              default={headBlend.shapeFirst}
              onChange={value => handleHeadBlendChange('shapeFirst', value)}
            />
            <Input
              title="Opção B"
              min={0}
              max={45}
              default={headBlend.shapeSecond}
              onChange={value => handleHeadBlendChange('shapeSecond', value)}
            />
            <RangeInput
              title="Mistura"
              min={0}
              max={10}
              factor={0.1}
              default={headBlend.shapeMix}
              onChange={value => handleHeadBlendChange('shapeMix', value)}
            />
          </Item>
          <Item title="Pele">
            <Input
              title="Opção A"
              min={0}
              max={45}
              default={headBlend.skinFirst}
              onChange={value => handleHeadBlendChange('skinFirst', value)}
            />
            <Input
              title="Opção B"
              min={0}
              max={45}
              default={headBlend.skinSecond}
              onChange={value => handleHeadBlendChange('skinSecond', value)}
            />
            <RangeInput
              title="Mistura"
              min={0}
              max={10}
              factor={0.1}
              default={headBlend.skinMix}
              onChange={value => handleHeadBlendChange('skinMix', value)}
            />
          </Item>
        </Section>
        <Section title="Características faciais">
          <Item title="Nariz">
            <RangeInput
              title="Largura"
              min={-10}
              max={10}
              factor={0.1}
              default={faceFeatures.noseWidth}
              onChange={value => handleFaceFeatureChange('noseWidth', value)}
            />
            <RangeInput
              title="Altura"
              min={-10}
              max={10}
              factor={0.1}
              default={faceFeatures.nosePeakHigh}
              onChange={value => handleFaceFeatureChange('nosePeakHigh', value)}
            />
            <RangeInput
              title="Tamanho"
              min={-10}
              max={10}
              factor={0.1}
              default={faceFeatures.nosePeakSize}
              onChange={value => handleFaceFeatureChange('nosePeakSize', value)}
            />
            <RangeInput
              title="Altura do osso"
              min={-10}
              max={10}
              factor={0.1}
              default={faceFeatures.noseBoneHigh}
              onChange={value => handleFaceFeatureChange('noseBoneHigh', value)}
            />
            <RangeInput
              title="Altura da ponta"
              min={-10}
              max={10}
              factor={0.1}
              default={faceFeatures.nosePeakLowering}
              onChange={value => handleFaceFeatureChange('nosePeakLowering', value)}
            />
            <RangeInput
              title="Deslocamento"
              min={-10}
              max={10}
              factor={0.1}
              default={faceFeatures.noseBoneTwist}
              onChange={value => handleFaceFeatureChange('noseBoneTwist', value)}
            />
          </Item>
          <Item title="Sobrancelha">
            <RangeInput
              title="Altura"
              min={-10}
              max={10}
              factor={0.1}
              default={faceFeatures.eyeBrownHigh}
              onChange={value => handleFaceFeatureChange('eyeBrownHigh', value)}
            />
            <RangeInput
              title="Profundidade"
              min={-10}
              max={10}
              factor={0.1}
              default={faceFeatures.eyeBrownForward}
              onChange={value => handleFaceFeatureChange('eyeBrownForward', value)}
            />
          </Item>
          <Item title="Bochecha">
            <RangeInput
              title="Altura da maçã do rosto"
              min={-10}
              max={10}
              factor={0.1}
              default={faceFeatures.cheeksBoneHigh}
              onChange={value => handleFaceFeatureChange('cheeksBoneHigh', value)}
            />
            <RangeInput
              title="Largura da maçã do rosto"
              min={-10}
              max={10}
              factor={0.1}
              default={faceFeatures.cheeksBoneWidth}
              onChange={value => handleFaceFeatureChange('cheeksBoneWidth', value)}
            />
            <RangeInput
              title="Largura"
              min={-10}
              max={10}
              factor={0.1}
              default={faceFeatures.cheeksWidth}
              onChange={value => handleFaceFeatureChange('cheeksWidth', value)}
            />
          </Item>
          <Item title="Olhos e boca">
            <RangeInput
              title="Abertura dos olhos"
              min={-10}
              max={10}
              factor={0.1}
              default={faceFeatures.eyesOpening}
              onChange={value => handleFaceFeatureChange('eyesOpening', value)}
            />
            <RangeInput
              title="Espessura dos lábios"
              min={-10}
              max={10}
              factor={0.1}
              default={faceFeatures.lipsThickness}
              onChange={value => handleFaceFeatureChange('lipsThickness', value)}
            />
          </Item>
          <Item title="Mandíbula">
            <RangeInput
              title="Largura"
              min={-10}
              max={10}
              factor={0.1}
              default={faceFeatures.jawBoneWidth}
              onChange={value => handleFaceFeatureChange('jawBoneWidth', value)}
            />
            <RangeInput
              title="Tamanho"
              min={-10}
              max={10}
              factor={0.1}
              default={faceFeatures.jawBoneBackSize}
              onChange={value => handleFaceFeatureChange('jawBoneBackSize', value)}
            />
          </Item>
          <Item title="Queixo">
            <RangeInput
              title="Altura"
              min={-10}
              max={10}
              factor={0.1}
              default={faceFeatures.chinBoneLowering}
              onChange={value => handleFaceFeatureChange('chinBoneLowering', value)}
            />
            <RangeInput
              title="Tamanho"
              min={-10}
              max={10}
              factor={0.1}
              default={faceFeatures.chinBoneLenght}
              onChange={value => handleFaceFeatureChange('chinBoneLenght', value)}
            />
            <RangeInput
              title="Largura"
              min={-10}
              max={10}
              factor={0.1}
              default={faceFeatures.chinBoneSize}
              onChange={value => handleFaceFeatureChange('chinBoneSize', value)}
            />
            <RangeInput
              title="Tamanho do furo"
              min={-10}
              max={10}
              factor={0.1}
              default={faceFeatures.chinHole}
              onChange={value => handleFaceFeatureChange('chinHole', value)}
            />
          </Item>
          <Item title="Pescoço">
            <RangeInput
              title="Espessura"
              min={-10}
              max={10}
              factor={0.1}
              default={faceFeatures.neckThickness}
              onChange={value => handleFaceFeatureChange('neckThickness', value)}
            />
          </Item>
        </Section>
        <Section title="Aparência">
          <Item title="Cabelo">
            <Input
              title="Estilo"
              min={0}
              max={255}
              default={hair.style}
              onChange={value => handleHairChange('style', value)}
            />
            <ColorInput
              title="Cor"
              colors={colors}
              default={hair.color}
              onChange={value => handleHairChange('color', value)}
            />
            <ColorInput
              title="Reflexo"
              colors={colors}
              default={hair.highlight}
              onChange={value => handleHairChange('highlight', value)}
            />
          </Item>
          <Item title="Manchas">
            <RangeInput
              title="Opacidade"
              min={0}
              max={10}
              factor={0.1}
              default={headOverlays.blemishes.opacity}
              onChange={value => handleHeadOverlayChange('blemishes', 'opacity', value)}
            />
            <Input
              title="Estilo"
              min={0}
              max={255}
              default={headOverlays.blemishes.style}
              onChange={value => handleHeadOverlayChange('blemishes', 'style', value)}
            />
          </Item>
          <Item title="Barba">
            <RangeInput
              title="Opacidade"
              min={0}
              max={10}
              factor={0.1}
              default={headOverlays.beard.opacity}
              onChange={value => handleHeadOverlayChange('beard', 'opacity', value)}
            />
            <Input
              title="Estilo"
              min={0}
              max={255}
              default={headOverlays.beard.style}
              onChange={value => handleHeadOverlayChange('beard', 'style', value)}
            />
            <ColorInput
              title="Cor"
              colors={colors}
              default={headOverlays.beard.color}
              onChange={value => handleHeadOverlayChange('beard', 'color', value)}
            />
          </Item>
          <Item title="Sobrancelha">
            <RangeInput
              title="Opacidade"
              min={0}
              max={10}
              factor={0.1}
              default={headOverlays.eyebrows.opacity}
              onChange={value => handleHeadOverlayChange('eyebrows', 'opacity', value)}
            />
            <Input
              title="Estilo"
              min={0}
              max={255}
              default={headOverlays.eyebrows.style}
              onChange={value => handleHeadOverlayChange('eyebrows', 'style', value)}
            />
            <ColorInput
              title="Cor"
              colors={colors}
              default={headOverlays.eyebrows.color}
              onChange={value => handleHeadOverlayChange('eyebrows', 'color', value)}
            />
          </Item>
          <Item title="Envelhecimento">
            <RangeInput
              title="Opacidade"
              min={0}
              max={10}
              factor={0.1}
              default={headOverlays.ageing.opacity}
              onChange={value => handleHeadOverlayChange('ageing', 'opacity', value)}
            />
            <Input
              title="Estilo"
              min={0}
              max={255}
              default={headOverlays.ageing.style}
              onChange={value => handleHeadOverlayChange('ageing', 'style', value)}
            />
          </Item>
          <Item title="Maquiagem">
            <RangeInput
              title="Opacidade"
              min={0}
              max={10}
              factor={0.1}
              default={headOverlays.makeUp.opacity}
              onChange={value => handleHeadOverlayChange('makeUp', 'opacity', value)}
            />
            <Input
              title="Estilo"
              min={0}
              max={255}
              default={headOverlays.makeUp.style}
              onChange={value => handleHeadOverlayChange('makeUp', 'style', value)}
            />
            <ColorInput
              title="Cor"
              colors={colors}
              default={headOverlays.makeUp.color}
              onChange={value => handleHeadOverlayChange('makeUp', 'color', value)}
            />
          </Item>
          <Item title="Blush">
            <RangeInput
              title="Opacidade"
              min={0}
              max={10}
              factor={0.1}
              default={headOverlays.blush.opacity}
              onChange={value => handleHeadOverlayChange('blush', 'opacity', value)}
            />
            <Input
              title="Estilo"
              min={0}
              max={255}
              default={headOverlays.blush.style}
              onChange={value => handleHeadOverlayChange('blush', 'style', value)}
            />
            <ColorInput
              title="Cor"
              colors={colors}
              default={headOverlays.blush.color}
              onChange={value => handleHeadOverlayChange('blush', 'color', value)}
            />
          </Item>
          <Item title="Aspecto da pele">
            <RangeInput
              title="Opacidade"
              min={0}
              max={10}
              factor={0.1}
              default={headOverlays.complexion.opacity}
              onChange={value => handleHeadOverlayChange('complexion', 'opacity', value)}
            />
            <Input
              title="Estilo"
              min={0}
              max={255}
              default={headOverlays.complexion.style}
              onChange={value => handleHeadOverlayChange('complexion', 'style', value)}
            />
          </Item>
          <Item title="Dano solar">
            <RangeInput
              title="Opacidade"
              min={0}
              max={10}
              factor={0.1}
              default={headOverlays.sunDamage.opacity}
              onChange={value => handleHeadOverlayChange('sunDamage', 'opacity', value)}
            />
            <Input
              title="Estilo"
              min={0}
              max={255}
              default={headOverlays.sunDamage.style}
              onChange={value => handleHeadOverlayChange('sunDamage', 'style', value)}
            />
          </Item>
          <Item title="Batom">
            <RangeInput
              title="Opacidade"
              min={0}
              max={10}
              factor={0.1}
              default={headOverlays.lipstick.opacity}
              onChange={value => handleHeadOverlayChange('lipstick', 'opacity', value)}
            />
            <Input
              title="Estilo"
              min={0}
              max={255}
              default={headOverlays.lipstick.style}
              onChange={value => handleHeadOverlayChange('lipstick', 'style', value)}
            />
            <ColorInput
              title="Cor"
              colors={colors}
              default={headOverlays.lipstick.color}
              onChange={value => handleHeadOverlayChange('lipstick', 'color', value)}
            />
          </Item>
          <Item title="Pintas e sardas">
            <RangeInput
              title="Opacidade"
              min={0}
              max={10}
              factor={0.1}
              default={headOverlays.moleAndFreckles.opacity}
              onChange={value => handleHeadOverlayChange('moleAndFreckles', 'opacity', value)}
            />
            <Input
              title="Estilo"
              min={0}
              max={255}
              default={headOverlays.moleAndFreckles.style}
              onChange={value => handleHeadOverlayChange('moleAndFreckles', 'style', value)}
            />
          </Item>
          <Item title="Cabelo do peito">
            <RangeInput
              title="Opacidade"
              min={0}
              max={10}
              factor={0.1}
              default={headOverlays.chestHair.opacity}
              onChange={value => handleHeadOverlayChange('chestHair', 'opacity', value)}
            />
            <Input
              title="Estilo"
              min={0}
              max={255}
              default={headOverlays.chestHair.style}
              onChange={value => handleHeadOverlayChange('chestHair', 'style', value)}
            />
            <ColorInput
              title="Cor"
              colors={colors}
              default={headOverlays.chestHair.color}
              onChange={value => handleHeadOverlayChange('chestHair', 'color', value)}
            />
          </Item>
          <Item title="Manchas Corporais">
            <RangeInput
              title="Opacidade"
              min={0}
              max={10}
              factor={0.1}
              default={headOverlays.bodyBlemishes.opacity}
              onChange={value => handleHeadOverlayChange('bodyBlemishes', 'opacity', value)}
            />
            <Input
              title="Estilo"
              min={0}
              max={255}
              default={headOverlays.bodyBlemishes.style}
              onChange={value => handleHeadOverlayChange('bodyBlemishes', 'style', value)}
            />
          </Item>
          <Item title="Cor dos olhos">
            <Input
              title="Estilo"
              min={0}
              max={255}
              default={eyeColor}
              onChange={value => handleEyeColorChange(value)}
            />
          </Item>
        </Section>
        <Section title="Vestuário">
          <Item title="Máscara">
            <FlexWrapper>
              <Input
                title="Modelo"
                min={0}
                max={255}
                default={getComponentDrawable(1)}
                onChange={value => handleComponentDrawableChange(1, value)}
              />
              <Input
                title="Textura"
                min={0}
                max={255}
                default={getComponentTexture(1)}
                onChange={value => handleComponentTextureChange(1, value)}
              />
            </FlexWrapper>
          </Item>
          <Item title="Mãos">
            <FlexWrapper>
              <Input
                title="Modelo"
                min={0}
                max={255}
                default={getComponentDrawable(3)}
                onChange={value => handleComponentDrawableChange(3, value)}
              />
              <Input
                title="Textura"
                min={0}
                max={255}
                default={getComponentTexture(3)}
                onChange={value => handleComponentTextureChange(3, value)}
              />
            </FlexWrapper>
          </Item>
          <Item title="Pernas">
            <FlexWrapper>
              <Input
                title="Modelo"
                min={0}
                max={255}
                default={getComponentDrawable(4)}
                onChange={value => handleComponentDrawableChange(4, value)}
              />
              <Input
                title="Textura"
                min={0}
                max={255}
                default={getComponentTexture(4)}
                onChange={value => handleComponentTextureChange(4, value)}
              />
            </FlexWrapper>
          </Item>
          <Item title="Mochila">
            <FlexWrapper>
              <Input
                title="Modelo"
                min={0}
                max={255}
                default={getComponentDrawable(5)}
                onChange={value => handleComponentDrawableChange(5, value)}
              />
              <Input
                title="Textura"
                min={0}
                max={255}
                default={getComponentTexture(5)}
                onChange={value => handleComponentTextureChange(5, value)}
              />
            </FlexWrapper>
          </Item>
          <Item title="Calçados">
            <FlexWrapper>
              <Input
                title="Modelo"
                min={0}
                max={255}
                default={getComponentDrawable(6)}
                onChange={value => handleComponentDrawableChange(6, value)}
              />
              <Input
                title="Textura"
                min={0}
                max={255}
                default={getComponentTexture(6)}
                onChange={value => handleComponentTextureChange(6, value)}
              />
            </FlexWrapper>
          </Item>
          <Item title="Acessórios">
            <FlexWrapper>
              <Input
                title="Modelo"
                min={0}
                max={255}
                default={getComponentDrawable(7)}
                onChange={value => handleComponentDrawableChange(7, value)}
              />
              <Input
                title="Textura"
                min={0}
                max={255}
                default={getComponentTexture(7)}
                onChange={value => handleComponentTextureChange(7, value)}
              />
            </FlexWrapper>
          </Item>
          <Item title="Camisa">
            <FlexWrapper>
              <Input
                title="Modelo"
                min={0}
                max={255}
                default={getComponentDrawable(8)}
                onChange={value => handleComponentDrawableChange(8, value)}
              />
              <Input
                title="Textura"
                min={0}
                max={255}
                default={getComponentTexture(8)}
                onChange={value => handleComponentTextureChange(8, value)}
              />
            </FlexWrapper>
          </Item>
          <Item title="Coletes">
            <FlexWrapper>
              <Input
                title="Modelo"
                min={0}
                max={255}
                default={getComponentDrawable(9)}
                onChange={value => handleComponentDrawableChange(9, value)}
              />
              <Input
                title="Textura"
                min={0}
                max={255}
                default={getComponentTexture(9)}
                onChange={value => handleComponentTextureChange(9, value)}
              />
            </FlexWrapper>
          </Item>
          <Item title="Emblemas">
            <FlexWrapper>
              <Input
                title="Modelo"
                min={0}
                max={255}
                default={getComponentDrawable(10)}
                onChange={value => handleComponentDrawableChange(10, value)}
              />
              <Input
                title="Textura"
                min={0}
                max={255}
                default={getComponentTexture(10)}
                onChange={value => handleComponentTextureChange(10, value)}
              />
            </FlexWrapper>
          </Item>
          <Item title="Jaquetas">
            <FlexWrapper>
              <Input
                title="Modelo"
                min={0}
                max={255}
                default={getComponentDrawable(11)}
                onChange={value => handleComponentDrawableChange(11, value)}
              />
              <Input
                title="Textura"
                min={0}
                max={255}
                default={getComponentTexture(11)}
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
                min={0}
                max={255}
                default={getPropDrawable(0)}
                onChange={value => handlePropDrawableChange(0, value)}
              />
              <Input
                title="Textura"
                min={0}
                max={255}
                default={getPropTexture(0)}
                onChange={value => handlePropTextureChange(0, value)}
              />
            </FlexWrapper>
          </Item>
          <Item title="Óculos">
            <FlexWrapper>
              <Input
                title="Modelo"
                min={0}
                max={255}
                default={getPropDrawable(1)}
                onChange={value => handlePropDrawableChange(1, value)}
              />
              <Input
                title="Textura"
                min={0}
                max={255}
                default={getPropTexture(1)}
                onChange={value => handlePropTextureChange(1, value)}
              />
            </FlexWrapper>
          </Item>
          <Item title="Orelha">
            <FlexWrapper>
              <Input
                title="Modelo"
                min={0}
                max={255}
                default={getPropDrawable(2)}
                onChange={value => handlePropDrawableChange(2, value)}
              />
              <Input
                title="Textura"
                min={0}
                max={255}
                default={getPropTexture(2)}
                onChange={value => handlePropTextureChange(2, value)}
              />
            </FlexWrapper>
          </Item>
          <Item title="Relógio">
            <FlexWrapper>
              <Input
                title="Modelo"
                min={0}
                max={255}
                default={getPropDrawable(6)}
                onChange={value => handlePropDrawableChange(6, value)}
              />
              <Input
                title="Textura"
                min={0}
                max={255}
                default={getPropTexture(6)}
                onChange={value => handlePropTextureChange(6, value)}
              />
            </FlexWrapper>
          </Item>
          <Item title="Bracelete">
            <FlexWrapper>
              <Input
                title="Modelo"
                min={0}
                max={255}
                default={getPropDrawable(7)}
                onChange={value => handlePropDrawableChange(7, value)}
              />
              <Input
                title="Textura"
                min={0}
                max={255}
                default={getPropTexture(7)}
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
