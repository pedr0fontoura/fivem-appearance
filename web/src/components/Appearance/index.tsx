import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTransition as useTransitionAnimation, animated } from 'react-spring';
import { useNuiState } from '../../hooks/nuiState';
import Nui from '../../Nui';
import mock from '../../mock';

import {
  CustomizationConfig,
  PedAppearance,
  AppearanceSettings,
  PedHeadBlend,
  PedFaceFeatures,
  PedHeadOverlays,
  PedHeadOverlayValue,
  PedHair,
  CameraState,
  ClothesState,
  Tattoo,
} from './interfaces';

import {
  APPEARANCE_INITIAL_STATE,
  SETTINGS_INITIAL_STATE,
  CAMERA_INITIAL_STATE,
  ROTATE_INITIAL_STATE,
  CLOTHES_INITIAL_STATE,
} from './settings';

import Ped from './Ped';
import HeadBlend from './HeadBlend';
import FaceFeatures from './FaceFeatures';
import HeadOverlays from './HeadOverlays';
import Components from './Components';
import Props from './Props';
import Options from './Options';
import Modal from '../Modal';
import Tattoos from './Tattoos';

import { Wrapper, Container } from './styles';

if (!import.meta.env.PROD) {
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

const Appearance = () => {
  const [config, setConfig] = useState<CustomizationConfig>();

  const [data, setData] = useState<PedAppearance>();
  const [storedData, setStoredData] = useState<PedAppearance>();
  const [appearanceSettings, setAppearanceSettings] = useState<AppearanceSettings>();

  const [camera, setCamera] = useState(CAMERA_INITIAL_STATE);
  const [rotate, setRotate] = useState(ROTATE_INITIAL_STATE);
  const [clothes, setClothes] = useState(CLOTHES_INITIAL_STATE);

  const [saveModal, setSaveModal] = useState(false);
  const [exitModal, setExitModal] = useState(false);

  const { display, setDisplay, locales, setLocales } = useNuiState();

  const wrapperTransition = useTransitionAnimation(display.appearance, null, {
    from: { transform: 'translateX(-50px)', opacity: 0 },
    enter: { transform: 'translateY(0)', opacity: 1 },
    leave: { transform: 'translateX(-50px)', opacity: 0 },
  });

  const saveModalTransition = useTransitionAnimation(saveModal, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const exitModalTransition = useTransitionAnimation(exitModal, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const handleTurnAround = useCallback(() => {
    Nui.post('appearance_turn_around');
  }, []);

  const handleSetClothes = useCallback(
    (key: keyof ClothesState) => {
      setClothes({ ...clothes, [key]: !clothes[key] });
      if (!clothes[key]) {
        Nui.post('appearance_remove_clothes', key);
      } else {
        Nui.post('appearance_wear_clothes', { data, key });
      }
    },
    [data, clothes, setClothes],
  );

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
      const { appearanceSettings: _appearanceSettings, appearanceData } = await Nui.post(
        'appearance_change_model',
        value,
      );

      setAppearanceSettings(_appearanceSettings);
      setData(appearanceData);
    },
    [setData, setAppearanceSettings],
  );

  const handleHeadBlendChange = useCallback(
    (key: keyof PedHeadBlend, value: number) => {
      if (!data) return;

      const updatedHeadBlend = { ...data.headBlend, [key]: value };

      const updatedData = { ...data, headBlend: updatedHeadBlend };

      setData(updatedData);

      Nui.post('appearance_change_head_blend', updatedHeadBlend);
    },
    [data, setData],
  );

  const handleFaceFeatureChange = useCallback(
    (key: keyof PedFaceFeatures, value: number) => {
      if (!data) return;

      const updatedFaceFeatures = { ...data.faceFeatures, [key]: value };

      const updatedData = { ...data, faceFeatures: updatedFaceFeatures };

      setData(updatedData);

      Nui.post('appearance_change_face_feature', updatedFaceFeatures);
    },
    [data, setData],
  );

  const handleHairChange = useCallback(
    (key: keyof PedHair, value: number) => {
      if (!data) return;

      const updatedHair = { ...data.hair, [key]: value };

      const updatedData = { ...data, hair: updatedHair };

      setData(updatedData);

      Nui.post('appearance_change_hair', updatedHair);
    },
    [data, setData],
  );

  const handleChangeFade = useCallback(async (value: number) => {
    if (!data || !appearanceSettings) return;
      const { tattoos } = data;
      const updatedTattoos = { ...tattoos };
      const tattoo = appearanceSettings.tattoos.items['ZONE_HAIR'][value]
      if (!updatedTattoos[tattoo.zone]) updatedTattoos[tattoo.zone] = [];
      updatedTattoos[tattoo.zone] = [tattoo];
      await Nui.post('appearance_apply_tattoo', updatedTattoos);
      setData({ ...data, tattoos: updatedTattoos });
  }, [appearanceSettings, data, setData])

  const handleHeadOverlayChange = useCallback(
    (key: keyof PedHeadOverlays, option: keyof PedHeadOverlayValue, value: number) => {
      if (!data) return;

      const updatedValue = { ...data.headOverlays[key], [option]: value };

      const updatedData = { ...data, headOverlays: { ...data.headOverlays, [key]: updatedValue } };

      setData(updatedData);

      Nui.post('appearance_change_head_overlay', { ...data.headOverlays, [key]: updatedValue });
    },
    [data, setData],
  );

  const handleEyeColorChange = useCallback(
    (value: number) => {
      if (!data) return;

      const updatedData = { ...data, eyeColor: value };

      setData(updatedData);

      Nui.post('appearance_change_eye_color', value);
    },
    [data, setData],
  );

  const handleComponentDrawableChange = useCallback(
    async (component_id: number, drawable: number) => {
      if (!data || !appearanceSettings) return;

      const component = data.components.find(c => c.component_id === component_id);

      if (!component) return;

      const updatedComponent = { ...component, drawable, texture: 0 };

      const filteredComponents = data.components.filter(c => c.component_id !== component_id);

      const updatedComponents = [...filteredComponents, updatedComponent];

      const updatedData = { ...data, components: updatedComponents };

      setData(updatedData);

      const updatedComponentSettings = await Nui.post('appearance_change_component', updatedComponent);

      const filteredComponentsSettings = appearanceSettings.components.filter(c => c.component_id !== component_id);

      const updatedComponentsSettings = [...filteredComponentsSettings, updatedComponentSettings];

      const updatedSettings = { ...appearanceSettings, components: updatedComponentsSettings };

      setAppearanceSettings(updatedSettings);
    },
    [data, setData, appearanceSettings, setAppearanceSettings],
  );

  const handleComponentTextureChange = useCallback(
    async (component_id: number, texture: number) => {
      if (!data || !appearanceSettings) return;

      const component = data.components.find(c => c.component_id === component_id);

      if (!component) return;

      const updatedComponent = { ...component, texture };

      const filteredComponents = data.components.filter(c => c.component_id !== component_id);

      const updatedComponents = [...filteredComponents, updatedComponent];

      const updatedData = { ...data, components: updatedComponents };

      setData(updatedData);

      const updatedComponentSettings = await Nui.post('appearance_change_component', updatedComponent);

      const filteredComponentsSettings = appearanceSettings.components.filter(c => c.component_id !== component_id);

      const updatedComponentsSettings = [...filteredComponentsSettings, updatedComponentSettings];

      const updatedSettings = { ...appearanceSettings, components: updatedComponentsSettings };

      setAppearanceSettings(updatedSettings);
    },
    [data, setData, appearanceSettings, setAppearanceSettings],
  );

  const handlePropDrawableChange = useCallback(
    async (prop_id: number, drawable: number) => {
      if (!data || !appearanceSettings) return;

      const prop = data.props.find(p => p.prop_id === prop_id);

      if (!prop) return;

      const updatedProp = { ...prop, drawable, texture: 0 };

      const filteredProps = data.props.filter(p => p.prop_id !== prop_id);

      const updatedProps = [...filteredProps, updatedProp];

      const updatedData = { ...data, props: updatedProps };

      setData(updatedData);

      const updatedPropSettings = await Nui.post('appearance_change_prop', updatedProp);

      const filteredPropsSettings = appearanceSettings.props.filter(c => c.prop_id !== prop_id);

      const updatedPropsSettings = [...filteredPropsSettings, updatedPropSettings];

      const updatedSettings = { ...appearanceSettings, props: updatedPropsSettings };

      setAppearanceSettings(updatedSettings);
    },
    [data, setData, appearanceSettings, setAppearanceSettings],
  );

  const handlePropTextureChange = useCallback(
    async (prop_id: number, texture: number) => {
      if (!data || !appearanceSettings) return;

      const prop = data.props.find(p => p.prop_id === prop_id);

      if (!prop) return;

      const updatedProp = { ...prop, texture };

      const filteredProps = data.props.filter(p => p.prop_id !== prop_id);

      const updatedProps = [...filteredProps, updatedProp];

      const updatedData = { ...data, props: updatedProps };

      setData(updatedData);

      const updatedPropSettings = await Nui.post('appearance_change_prop', updatedProp);

      const filteredPropsSettings = appearanceSettings.props.filter(c => c.prop_id !== prop_id);

      const updatedPropsSettings = [...filteredPropsSettings, updatedPropSettings];

      const updatedSettings = { ...appearanceSettings, props: updatedPropsSettings };

      setAppearanceSettings(updatedSettings);
    },
    [data, setData, appearanceSettings, setAppearanceSettings],
  );

  const isPedFreemodeModel = useMemo(() => {
    if (!data) return;

    return data.model === 'mp_m_freemode_01' || data.model === 'mp_f_freemode_01';
  }, [data]);

  const handleApplyTattoo = useCallback(
    async (tattoo: Tattoo) => {
      if (!data) return;
      const { tattoos } = data;
      const updatedTattoos = { ...tattoos };
      if (!updatedTattoos[tattoo.zone]) updatedTattoos[tattoo.zone] = [];
      updatedTattoos[tattoo.zone].push(tattoo);
      await Nui.post('appearance_apply_tattoo', updatedTattoos);
      setData({ ...data, tattoos: updatedTattoos });
    },
    [data, setData],
  );

  const handlePreviewTattoo = useCallback(
    (tattoo: Tattoo) => {
      if (!data) return;
      const { tattoos } = data;
      Nui.post('appearance_preview_tattoo', { data: tattoos, tattoo });
    },
    [data],
  );

  const handleDeleteTattoo = useCallback(
    async (tattoo: Tattoo) => {
      if (!data) return;
      const { tattoos } = data;
      const updatedTattoos = tattoos;
      // eslint-disable-next-line prettier/prettier
      updatedTattoos[tattoo.zone] = updatedTattoos[tattoo.zone].filter(
        tattooDelete => tattooDelete.name !== tattoo.name,
      );
      await Nui.post('appearance_delete_tattoo', updatedTattoos);
      setData({ ...data, tattoos: updatedTattoos });
    },
    [data, setData],
  );

  useEffect(() => {
    Nui.post('appearance_get_locales').then(result => setLocales(JSON.parse(result)));

    Nui.onEvent('appearance_display', () => {
      setDisplay({ appearance: true });
    });

    Nui.onEvent('appearance_hide', () => {
      setDisplay({ appearance: false });
      setData(APPEARANCE_INITIAL_STATE);
      setStoredData(APPEARANCE_INITIAL_STATE);
      setAppearanceSettings(SETTINGS_INITIAL_STATE);
      setCamera(CAMERA_INITIAL_STATE);
      setRotate(ROTATE_INITIAL_STATE);
    });
  }, []);

  useEffect(() => {
    if (display.appearance) {
      (async () => {
        const {
          config: _config,
          appearanceSettings: settings,
          appearanceData,
        } = await Nui.post('appearance_get_settings_and_data');

        setConfig(_config);
        setAppearanceSettings(settings);
        setStoredData(appearanceData);
        setData(appearanceData);
      })();
    }
  }, [display.appearance]);

  if (!display.appearance || !config || !appearanceSettings || !data || !storedData || !locales) {
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
                  {config.ped && (
                    <Ped
                      settings={appearanceSettings.ped}
                      storedData={storedData.model}
                      data={data.model}
                      handleModelChange={handleModelChange}
                    />
                  )}
                  {isPedFreemodeModel && appearanceSettings && (
                    <>
                      {config.headBlend && (
                        <HeadBlend
                          settings={appearanceSettings.headBlend}
                          storedData={storedData.headBlend}
                          data={data.headBlend}
                          handleHeadBlendChange={handleHeadBlendChange}
                        />
                      )}
                      {config.faceFeatures && (
                        <FaceFeatures
                          settings={appearanceSettings.faceFeatures}
                          storedData={storedData.faceFeatures}
                          data={data.faceFeatures}
                          handleFaceFeatureChange={handleFaceFeatureChange}
                        />
                      )}
                      {config.headOverlays && (
                        <HeadOverlays
                          settings={{
                            hair: appearanceSettings.hair,
                            headOverlays: appearanceSettings.headOverlays,
                            eyeColor: appearanceSettings.eyeColor,
                            fade: appearanceSettings.tattoos.items['ZONE_HAIR']
                          }}
                          storedData={{
                            hair: storedData.hair,
                            headOverlays: storedData.headOverlays,
                            eyeColor: storedData.eyeColor,
                            fade: storedData.tattoos?.ZONE_HAIR?.length > 0 ? storedData.tattoos.ZONE_HAIR[0] : null
                          }}
                          data={{
                            hair: data.hair,
                            headOverlays: data.headOverlays,
                            eyeColor: data.eyeColor,
                            fade: data.tattoos?.ZONE_HAIR?.length > 0 ? data.tattoos.ZONE_HAIR[0] : null
                          }}
                          handleHairChange={handleHairChange}
                          handleHeadOverlayChange={handleHeadOverlayChange}
                          handleEyeColorChange={handleEyeColorChange}
                          handleChangeFade={handleChangeFade}
                          automaticFade={config.automaticFade}
                        />
                      )}
                    </>
                  )}
                  {config.components && (
                    <Components
                      settings={appearanceSettings.components}
                      data={data.components}
                      storedData={storedData.components}
                      handleComponentDrawableChange={handleComponentDrawableChange}
                      handleComponentTextureChange={handleComponentTextureChange}
                    />
                  )}
                  {config.props && (
                    <Props
                      settings={appearanceSettings.props}
                      data={data.props}
                      storedData={storedData.props}
                      handlePropDrawableChange={handlePropDrawableChange}
                      handlePropTextureChange={handlePropTextureChange}
                    />
                  )}
                  {isPedFreemodeModel && config.tattoos && (
                    <Tattoos
                      settings={appearanceSettings.tattoos}
                      data={data.tattoos}
                      handleApplyTattoo={handleApplyTattoo}
                      handlePreviewTattoo={handlePreviewTattoo}
                      handleDeleteTattoo={handleDeleteTattoo}
                    />
                  )}
                </Container>
                <Options
                  camera={camera}
                  rotate={rotate}
                  clothes={clothes}
                  config={config}
                  handleSetClothes={handleSetClothes}
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
                title={locales.modal.save.title}
                description={locales.modal.save.description}
                accept={locales.modal.accept}
                decline={locales.modal.decline}
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
                title={locales.modal.exit.title}
                description={locales.modal.exit.description}
                accept={locales.modal.accept}
                decline={locales.modal.decline}
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
