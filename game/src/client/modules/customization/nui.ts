import {
  getAppearance,
  getAppearanceSettings,
  getConfig,
  getComponentSettings,
  getPropSettings,
  pedTurnAround,
  setCamera,
  rotateCamera,
  exitPlayerCustomization,
  playerHeading,
} from './index';

import {
  getPedAppearance,
  setPlayerModel,
  setPedHeadBlend,
  setPedFaceFeatures,
  setPedHair,
  setPedHeadOverlays,
  setPedEyeColor,
  setPedComponent,
  setPedProp,
} from '../../index';

export function registerNuiCallbacks(): void {
  RegisterNuiCallbackType('appearance_get_locales');
  RegisterNuiCallbackType('appearance_get_settings_and_data');
  RegisterNuiCallbackType('appearance_set_camera');
  RegisterNuiCallbackType('appearance_turn_around');
  RegisterNuiCallbackType('appearance_rotate_camera');
  RegisterNuiCallbackType('appearance_change_model');
  RegisterNuiCallbackType('appearance_change_head_blend');
  RegisterNuiCallbackType('appearance_change_face_feature');
  RegisterNuiCallbackType('appearance_change_hair');
  RegisterNuiCallbackType('appearance_change_head_overlay');
  RegisterNuiCallbackType('appearance_change_eye_color');
  RegisterNuiCallbackType('appearance_change_component');
  RegisterNuiCallbackType('appearance_change_prop');

  RegisterNuiCallbackType('appearance_save');
  RegisterNuiCallbackType('appearance_exit');

  on('__cfx_nui:appearance_get_locales', (_: any, cb: (arg: any) => void): void => {
    const locales = LoadResourceFile(
      GetCurrentResourceName(),
      `locales/${GetConvar('fivem-appearance:locale', 'en')}.json`,
    );

    cb(locales);
  });

  on('__cfx_nui:appearance_get_settings_and_data', (_: any, cb: (arg: any) => void): void => {
    const config = getConfig();
    const appearanceData = getAppearance();
    const appearanceSettings = getAppearanceSettings();
    cb({ config, appearanceData, appearanceSettings });
  });

  on('__cfx_nui:appearance_set_camera', (camera: string, cb: (arg: any) => void): void => {
    cb({});
    setCamera(camera);
  });

  on('__cfx_nui:appearance_turn_around', (_: any, cb: (arg: any) => void): void => {
    cb({});

    pedTurnAround(PlayerPedId());
  });

  on(
    '__cfx_nui:appearance_rotate_camera',
    (direction: 'left' | 'right', cb: (arg: any) => void): void => {
      cb({});
      rotateCamera(direction);
    },
  );

  on(
    '__cfx_nui:appearance_change_model',
    async (model: string, cb: (arg: any) => void): Promise<void> => {
      await setPlayerModel(model);

      const playerPed = PlayerPedId();

      SetEntityHeading(PlayerPedId(), playerHeading);
      SetEntityInvincible(playerPed, true);
      TaskStandStill(playerPed, -1);

      const appearanceData = getPedAppearance(playerPed);
      const appearanceSettings = getAppearanceSettings();

      cb({ appearanceSettings, appearanceData });
    },
  );

  on(
    '__cfx_nui:appearance_change_component',
    (component: PedComponent, cb: (arg: any) => void): void => {
      const playerPed = PlayerPedId();
      setPedComponent(playerPed, component);
      cb(getComponentSettings(playerPed, component.component_id));
    },
  );

  on('__cfx_nui:appearance_change_prop', (prop: PedProp, cb: (arg: any) => void): void => {
    const playerPed = PlayerPedId();
    setPedProp(playerPed, prop);
    cb(getPropSettings(playerPed, prop.prop_id));
  });

  on(
    '__cfx_nui:appearance_change_head_blend',
    (headBlend: PedHeadBlend, cb: (arg: any) => void) => {
      cb({});
      setPedHeadBlend(PlayerPedId(), headBlend);
    },
  );

  on(
    '__cfx_nui:appearance_change_face_feature',
    (faceFeatures: PedFaceFeatures, cb: (arg: any) => void): void => {
      cb({});
      setPedFaceFeatures(PlayerPedId(), faceFeatures);
    },
  );

  on(
    '__cfx_nui:appearance_change_head_overlay',
    (headOverlays: PedHeadOverlays, cb: (arg: any) => void): void => {
      cb({});
      setPedHeadOverlays(PlayerPedId(), headOverlays);
    },
  );

  on('__cfx_nui:appearance_change_hair', (hair: PedHair, cb: (arg: any) => void): void => {
    cb({});
    setPedHair(PlayerPedId(), hair);
  });

  on('__cfx_nui:appearance_change_eye_color', (eyeColor: number, cb: (arg: any) => void): void => {
    cb({});
    setPedEyeColor(PlayerPedId(), eyeColor);
  });

  on('__cfx_nui:appearance_save', (appearance: PedAppearance, cb: (arg: any) => void): void => {
    cb({});
    exitPlayerCustomization(appearance);
  });

  on('__cfx_nui:appearance_exit', (_: any, cb: (arg: any) => void): void => {
    cb({});
    exitPlayerCustomization();
  });
}
