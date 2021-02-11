import {
  getAppearance,
  getAppearanceSettings,
  getComponentsSettings,
  getPropsSettings,
  pedTurnAround,
  setCamera,
  rotateCamera,
  getPlayerPedAppearance,
  exitPlayerCustomization,
} from './index';

import {
  setPlayerModel,
  setPedHeadBlend,
  setPedFaceFeatures,
  setPedHair,
  setPedHeadOverlays,
  setPedEyeColor,
  setPedComponents,
  setPedProps,
} from '../../index';

export function registerNuiCallbacks(): void {
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

  on('__cfx_nui:appearance_get_settings_and_data', (_: any, cb: (arg: any) => void): void => {
    const appearanceData = getAppearance();
    const appearanceSettings = getAppearanceSettings(appearanceData);
    cb({ appearanceData, appearanceSettings });
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

  on('__cfx_nui:appearance_change_model', (model: string, cb: (arg: any) => void): void => {
    setPlayerModel(model);

    const playerPed = PlayerPedId();

    ClearPedTasksImmediately(playerPed);
    TaskStandStill(playerPed, -1);

    const appearanceData = getPlayerPedAppearance(model);
    const appearanceSettings = getAppearanceSettings(appearanceData);

    cb({ appearanceSettings, appearanceData });
  });

  on(
    '__cfx_nui:appearance_change_component',
    (components: PedComponent[], cb: (arg: any) => void): void => {
      setPedComponents(PlayerPedId(), components);
      cb(getComponentsSettings(components));
    },
  );

  on('__cfx_nui:appearance_change_prop', (props: PedProp[], cb: (arg: any) => void): void => {
    setPedProps(PlayerPedId(), props);
    cb(getPropsSettings(props));
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
