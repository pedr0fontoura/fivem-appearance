import { useState, useEffect, useCallback } from 'react';
import { useNuiState } from '../../hooks/nuiState';
import Nui from '../../Nui';

import { PedHeadBlend, PedFaceFeatures, PedHeadOverlays, PedHeadOverlayValue, PedHair } from './interfaces';

import { APPEARANCE_INITIAL_STATE, SETTINGS_INITIAL_STATE } from './settings';

import Ped from './Ped';
import HeadBlend from './HeadBlend';
import FaceFeatures from './FaceFeatures';
import HeadOverlays from './HeadOverlays';
import Components from './Components';
import Props from './Props';
import Options from './Options';

import { Wrapper, Container } from './styles';

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
        <Ped items={settings.models} model={model} handleModelChange={handleModelChange} />
        <HeadBlend settings={settings.headBlend} headBlend={headBlend} handleHeadBlendChange={handleHeadBlendChange} />
        <FaceFeatures
          settings={settings.faceFeatures}
          faceFeatures={faceFeatures}
          handleFaceFeatureChange={handleFaceFeatureChange}
        />
        <HeadOverlays
          settings={{ hair: settings.hair, headOverlays: settings.headOverlays, eyeColor: settings.eyeColor }}
          hair={hair}
          headOverlays={headOverlays}
          eyeColor={eyeColor}
          handleHairChange={handleHairChange}
          handleHeadOverlayChange={handleHeadOverlayChange}
          handleEyeColorChange={handleEyeColorChange}
        />
        <Components
          getComponentSettings={getComponentSettings}
          getComponentDrawable={getComponentDrawable}
          getComponentTexture={getComponentTexture}
          handleComponentDrawableChange={handleComponentDrawableChange}
          handleComponentTextureChange={handleComponentTextureChange}
        />
        <Props
          getPropSettings={getPropSettings}
          getPropDrawable={getPropDrawable}
          getPropTexture={getPropTexture}
          handlePropDrawableChange={handlePropDrawableChange}
          handlePropTextureChange={handlePropTextureChange}
        />
      </Container>
      <Options />
    </Wrapper>
  );
};

export default Appearance;
