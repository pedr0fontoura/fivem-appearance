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

if (process.env.REACT_APP_ENV !== 'production') {
  mock('appearance_get_settings_and_data', () => ({
    appearanceData: { ...APPEARANCE_INITIAL_STATE, model: 'mp_f_freemode_01' },
    appearanceSettings: {
      ...SETTINGS_INITIAL_STATE,
      eyeColor: { min: 0, max: 24 },
      hair: {
        ...SETTINGS_INITIAL_STATE.hair,
        color: {
          items: [
            [255, 0, 0],
            [0, 255, 0],
            [0, 0, 255],
            [0, 0, 255],
          ],
        },
      },
    },
  }));

  mock('appearance_change_model', () => SETTINGS_INITIAL_STATE);

  mock('appearance_change_component', () => SETTINGS_INITIAL_STATE.components);

  mock('appearance_change_prop', () => SETTINGS_INITIAL_STATE.props);
}

const Appearance: React.FC = () => {
  const [data, setData] = useState<PedAppearance>(APPEARANCE_INITIAL_STATE);
  const [storedData, setStoredData] = useState<PedAppearance>(APPEARANCE_INITIAL_STATE);

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
      let componentSettings = settings.components.find(c => c.component_id === component_id);

      if (!componentSettings) {
        [componentSettings] = settings.components;
      }

      return componentSettings;
    },
    [settings.components],
  );

  const getPropSettings = useCallback(
    (prop_id: number) => {
      let propSettings = settings.props.find(p => p.prop_id === prop_id);

      if (!propSettings) {
        [propSettings] = settings.props;
      }

      return propSettings;
    },
    [settings.props],
  );

  const getStoredComponent = (component_id: number) => {
    let component = storedData.components.find(c => c.component_id === component_id);

    if (!component) {
      [component] = storedData.components;
    }
    return component;
  };

  const getStoredProp = (prop_id: number) => {
    let prop = storedData.props.find(p => p.prop_id === prop_id);

    if (!prop) {
      [prop] = storedData.props;
    }
    return prop;
  };

  const getComponent = (component_id: number) => {
    let component = components.find(c => c.component_id === component_id);

    if (!component) {
      [component] = components;
    }
    return component;
  };

  const getProp = (prop_id: number) => {
    let prop = props.find(p => p.prop_id === prop_id);

    if (!prop) {
      [prop] = props;
    }
    return prop;
  };

  const handleTurnAround = useCallback(() => {
    Nui.post('appearance_turn_around');
  }, []);

  const handleSetCamera = useCallback(
    (key: keyof CameraState) => {
      setCamera({ ...CAMERA_INITIAL_STATE, [key]: !camera[key] });
      setRotate(ROTATE_INITIAL_STATE);

      if (!camera[key]) {
        Nui.post('appearance_set_camera', key);
      } else {
        Nui.post('appearance_set_camera', 'default');
      }
    },
    [camera, setCamera, setRotate],
  );

  const handleRotateLeft = useCallback(() => {
    setRotate({ left: !rotate.left, right: false });

    if (!rotate.left) {
      Nui.post('appearance_rotate_camera', 'left');
    } else {
      Nui.post('appearance_set_camera', 'current');
    }
  }, [setRotate, rotate]);

  const handleRotateRight = useCallback(() => {
    setRotate({ left: false, right: !rotate.right });

    if (!rotate.right) {
      Nui.post('appearance_rotate_camera', 'right');
    } else {
      Nui.post('appearance_set_camera', 'current');
    }
  }, [setRotate, rotate]);

  const handleSaveModal = useCallback(() => {
    setSaveModal(true);
  }, [setSaveModal]);

  const handleExitModal = useCallback(() => {
    setExitModal(true);
  }, [setExitModal]);

  const handleSave = useCallback(
    async (accept: boolean) => {
      if (accept) {
        await Nui.post('appearance_save', data);
        setSaveModal(false);
      } else {
        setSaveModal(false);
      }
    },
    [setSaveModal, data],
  );

  const handleExit = useCallback(
    async (accept: boolean) => {
      if (accept) {
        await Nui.post('appearance_exit');
        setExitModal(false);
      } else {
        setExitModal(false);
      }
    },
    [setExitModal],
  );

  const handleModelChange = useCallback(
    async (value: string) => {
      const { appearanceSettings, appearanceData } = await Nui.post('appearance_change_model', value);

      setSettings(appearanceSettings);
      setData(appearanceData);
    },
    [setData, setSettings],
  );

  const handleHeadBlendChange = useCallback(
    (key: keyof PedHeadBlend, value: number) => {
      const updatedHeadBlend = { ...headBlend, [key]: value };

      setData(state => ({ ...state, headBlend: updatedHeadBlend }));

      Nui.post('appearance_change_head_blend', updatedHeadBlend);
    },
    [setData, headBlend],
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

      Nui.post('appearance_change_face_feature', { ...faceFeatures, [key]: value });
    },
    [setData, faceFeatures],
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

      Nui.post('appearance_change_hair', { ...hair, [key]: value });
    },
    [setData, hair],
  );

  const handleHeadOverlayChange = useCallback(
    (key: keyof PedHeadOverlays, option: keyof PedHeadOverlayValue, value: number) => {
      const updatedValue = { ...headOverlays[key], [option]: value };

      setData(state => ({ ...state, headOverlays: { ...state.headOverlays, [key]: updatedValue } }));

      Nui.post('appearance_change_head_overlay', { ...headOverlays, [key]: updatedValue });
    },
    [setData, headOverlays],
  );

  const handleEyeColorChange = useCallback(
    (value: number) => {
      setData(state => ({
        ...state,
        eyeColor: value,
      }));

      Nui.post('appearance_change_eye_color', value);
    },
    [setData],
  );

  const handleComponentDrawableChange = useCallback(
    async (component_id: number, drawable: number) => {
      const component = components.find(c => c.component_id === component_id);

      if (!component) return;

      const updatedComponent = { ...component, drawable, texture: 0 };

      const filteredComponents = components.filter(c => c.component_id !== component_id);

      const updatedComponents = [...filteredComponents, updatedComponent];

      setData(state => ({ ...state, components: updatedComponents }));

      const updatedComponentsSettings = await Nui.post('appearance_change_component', updatedComponents);

      setSettings(state => ({
        ...state,
        components: updatedComponentsSettings,
      }));
    },
    [setData, components, setSettings],
  );

  const handleComponentTextureChange = useCallback(
    async (component_id: number, texture: number) => {
      const component = components.find(c => c.component_id === component_id);

      if (!component) return;

      const updatedComponent = { ...component, texture };

      const filteredComponents = components.filter(c => c.component_id !== component_id);

      const updatedComponents = [...filteredComponents, updatedComponent];

      setData(state => ({ ...state, components: updatedComponents }));

      const updatedComponentsSettings = await Nui.post('appearance_change_component', updatedComponents);

      setSettings(state => ({
        ...state,
        components: updatedComponentsSettings,
      }));
    },
    [setData, components, setSettings],
  );

  const handlePropDrawableChange = useCallback(
    async (prop_id: number, drawable: number) => {
      const prop = props.find(p => p.prop_id === prop_id);

      if (!prop) return;

      const updatedProp = { ...prop, drawable, texture: 0 };

      const filteredProps = props.filter(p => p.prop_id !== prop_id);

      const updatedProps = [...filteredProps, updatedProp];

      setData(state => ({ ...state, props: updatedProps }));

      const updatedPropsSettings = await Nui.post('appearance_change_prop', updatedProps);

      setSettings(state => ({
        ...state,
        props: updatedPropsSettings,
      }));
    },
    [setData, props, setSettings],
  );

  const handlePropTextureChange = useCallback(
    async (prop_id: number, texture: number) => {
      const prop = props.find(p => p.prop_id === prop_id);

      if (!prop) return;

      const updatedProp = { ...prop, texture };

      const filteredProps = props.filter(p => p.prop_id !== prop_id);

      const updatedProps = [...filteredProps, updatedProp];

      setData(state => ({ ...state, props: updatedProps }));

      const updatedPropsSettings = await Nui.post('appearance_change_prop', updatedProps);

      setSettings(state => ({
        ...state,
        props: updatedPropsSettings,
      }));
    },
    [setData, props, setSettings],
  );

  const isPedFreemodeModel = useMemo(() => {
    return data.model === 'mp_m_freemode_01' || data.model === 'mp_f_freemode_01';
  }, [data.model]);

  useEffect(() => {
    Nui.onEvent('appearance_display', () => {
      setDisplay({ appearance: true });
    });

    Nui.onEvent('appearance_hide', () => {
      setDisplay({ appearance: false });
    });
  }, [setDisplay]);

  useEffect(() => {
    if (display.appearance) {
      (async () => {
        const { appearanceSettings, appearanceData } = await Nui.post('appearance_get_settings_and_data');
        setSettings(appearanceSettings);
        setStoredData(appearanceData);
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
                  <Ped
                    settings={settings.ped}
                    storedData={storedData.model}
                    data={model}
                    handleModelChange={handleModelChange}
                  />
                  {isPedFreemodeModel && settings && (
                    <>
                      <HeadBlend
                        settings={settings.headBlend}
                        storedData={storedData.headBlend}
                        data={headBlend}
                        handleHeadBlendChange={handleHeadBlendChange}
                      />
                      <FaceFeatures
                        settings={settings.faceFeatures}
                        storedData={storedData.faceFeatures}
                        data={faceFeatures}
                        handleFaceFeatureChange={handleFaceFeatureChange}
                      />
                      <HeadOverlays
                        settings={{
                          hair: settings.hair,
                          headOverlays: settings.headOverlays,
                          eyeColor: settings.eyeColor,
                        }}
                        storedData={{
                          hair: storedData.hair,
                          headOverlays: storedData.headOverlays,
                          eyeColor: storedData.eyeColor,
                        }}
                        data={{
                          hair,
                          headOverlays,
                          eyeColor,
                        }}
                        handleHairChange={handleHairChange}
                        handleHeadOverlayChange={handleHeadOverlayChange}
                        handleEyeColorChange={handleEyeColorChange}
                      />
                    </>
                  )}
                  <Components
                    getComponentSettings={getComponentSettings}
                    getStoredComponent={getStoredComponent}
                    getComponent={getComponent}
                    handleComponentDrawableChange={handleComponentDrawableChange}
                    handleComponentTextureChange={handleComponentTextureChange}
                  />
                  <Props
                    getPropSettings={getPropSettings}
                    getStoredProp={getStoredProp}
                    getProp={getProp}
                    handlePropDrawableChange={handlePropDrawableChange}
                    handlePropTextureChange={handlePropTextureChange}
                  />
                </Container>
                <Options
                  camera={camera}
                  rotate={rotate}
                  handleSetCamera={handleSetCamera}
                  handleTurnAround={handleTurnAround}
                  handleRotateLeft={handleRotateLeft}
                  handleRotateRight={handleRotateRight}
                  handleSave={handleSaveModal}
                  handleExit={handleExitModal}
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
                handleAccept={() => handleSave(true)}
                handleDecline={() => handleSave(false)}
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
                handleAccept={() => handleExit(true)}
                handleDecline={() => handleExit(false)}
              />
            </animated.div>
          ),
      )}
    </>
  );
};

export default Appearance;
