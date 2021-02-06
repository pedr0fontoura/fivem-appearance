import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTransition, animated } from 'react-spring';
import { useNuiState } from '../../hooks/nuiState';
import Nui from '../../Nui';
import mock from '../../mock';

import {
  PedAppearance,
  AppearanceSettings,
  PedHeadBlend,
  PedFaceFeatures,
  PedHeadOverlays,
  PedHeadOverlayValue,
  PedHair,
  CameraState,
} from './interfaces';

import {
  APPEARANCE_INITIAL_STATE,
  SETTINGS_INITIAL_STATE,
  CAMERA_INITIAL_STATE,
  ROTATE_INITIAL_STATE,
} from './settings';

import Ped from './Ped';
import HeadBlend from './HeadBlend';
import FaceFeatures from './FaceFeatures';
import HeadOverlays from './HeadOverlays';
import Components from './Components';
import Props from './Props';
import Options from './Options';
import Modal from '../Modal';

import { Wrapper, Container } from './styles';

if (process.env.NODE_ENV === 'development') {
  mock('cfx-appearance:getSettingsAndData', () => ({
    appearanceData: { ...APPEARANCE_INITIAL_STATE, model: 'mp_f_freemode_01' },
    appearanceSettings: { ...SETTINGS_INITIAL_STATE, eyeColor: { min: 0, max: 24 } },
  }));
}

const Appearance: React.FC = () => {
  const [data, setData] = useState<PedAppearance>(APPEARANCE_INITIAL_STATE);
  const [settings, setSettings] = useState<AppearanceSettings>(SETTINGS_INITIAL_STATE);

  const [camera, setCamera] = useState(CAMERA_INITIAL_STATE);
  const [rotate, setRotate] = useState(ROTATE_INITIAL_STATE);

  const [saveModal, setSaveModal] = useState(false);
  const [exitModal, setExitModal] = useState(false);

  const { display, setDisplay } = useNuiState();

  const wrapperTransition = useTransition(display.appearance, null, {
    from: { transform: 'translateX(-50px)', opacity: 0 },
    enter: { transform: 'translateY(0)', opacity: 1 },
    leave: { transform: 'translateX(-50px)', opacity: 0 },
  });

  const saveModalTransition = useTransition(saveModal, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const exitModalTransition = useTransition(exitModal, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

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

  const handleCameraChange = useCallback(
    (key: keyof CameraState) => {
      setCamera(state => {
        const currentCameraState = state[key];

        const cameraState = { ...state };

        Object.assign(cameraState, CAMERA_INITIAL_STATE);

        return { ...cameraState, [key]: !currentCameraState };
      });
    },
    [setCamera],
  );

  const handleRotateLeft = useCallback(() => {
    setRotate(state => ({ left: !state.left, right: false }));
  }, [setRotate]);

  const handleRotateRight = useCallback(() => {
    setRotate(state => ({ left: false, right: !state.right }));
  }, [setRotate]);

  const handleSave = useCallback(() => {
    setSaveModal(true);
  }, [setSaveModal]);

  const handleExit = useCallback(() => {
    setExitModal(true);
  }, [setExitModal]);

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

  const isPedFreemodeModel = useMemo(() => {
    return data.model === 'mp_m_freemode_01' || data.model === 'mp_f_freemode_01';
  }, [data.model]);

  useEffect(() => {
    Nui.onEvent('cfx-appearance:display', () => {
      setDisplay({ appearance: true });
    });
  }, [setDisplay]);

  useEffect(() => {
    if (display.appearance) {
      (async () => {
        const { appearanceSettings, appearanceData } = await Nui.post('cfx-appearance:getSettingsAndData');
        setSettings(appearanceSettings);
        setData(appearanceData);
      })();
    }
  }, [display.appearance]);

  if (!display.appearance) {
    return null;
  }

  return (
    <>
      {wrapperTransition.map(
        ({ item, key, props: style }) =>
          item && (
            <animated.div key={key} style={style}>
              <Wrapper>
                <Container>
                  <Ped settings={settings.ped} model={model} handleModelChange={handleModelChange} />
                  {isPedFreemodeModel && (
                    <>
                      <HeadBlend
                        settings={settings.headBlend}
                        headBlend={headBlend}
                        handleHeadBlendChange={handleHeadBlendChange}
                      />
                      <FaceFeatures
                        settings={settings.faceFeatures}
                        faceFeatures={faceFeatures}
                        handleFaceFeatureChange={handleFaceFeatureChange}
                      />
                      <HeadOverlays
                        settings={{
                          hair: settings.hair,
                          headOverlays: settings.headOverlays,
                          eyeColor: settings.eyeColor,
                        }}
                        hair={hair}
                        headOverlays={headOverlays}
                        eyeColor={eyeColor}
                        handleHairChange={handleHairChange}
                        handleHeadOverlayChange={handleHeadOverlayChange}
                        handleEyeColorChange={handleEyeColorChange}
                      />
                    </>
                  )}
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
                <Options
                  camera={camera}
                  rotate={rotate}
                  handleCameraChange={handleCameraChange}
                  handleRotateLeft={handleRotateLeft}
                  handleRotateRight={handleRotateRight}
                  handleSave={handleSave}
                  handleExit={handleExit}
                />
              </Wrapper>
            </animated.div>
          ),
      )}
      {saveModalTransition.map(
        ({ item, key, props: style }) =>
          item && (
            <animated.div key={key} style={style}>
              <Modal
                title="Salvar customização"
                description="Você continua feio"
                handleAccept={() => {}}
                handleDecline={() => {
                  setSaveModal(false);
                }}
              />
            </animated.div>
          ),
      )}
      {exitModalTransition.map(
        ({ item, key, props: style }) =>
          item && (
            <animated.div key={key} style={style}>
              <Modal
                title="Sair da customização"
                description="Nenhuma alteração será salva"
                handleAccept={() => {}}
                handleDecline={() => {
                  setExitModal(false);
                }}
              />
            </animated.div>
          ),
      )}
    </>
  );
};

export default Appearance;
