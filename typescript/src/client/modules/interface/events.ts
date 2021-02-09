import {
  getAppearance,
  getAppearanceSettings,
  getComponentsSettings,
  getPropsSettings,
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
  RegisterNuiCallbackType('appearance_change_model');
  RegisterNuiCallbackType('appearance_change_head_blend');
  RegisterNuiCallbackType('appearance_change_face_feature');
  RegisterNuiCallbackType('appearance_change_hair');
  RegisterNuiCallbackType('appearance_change_head_overlay');
  RegisterNuiCallbackType('appearance_change_eye_color');
  RegisterNuiCallbackType('appearance_change_component');
  RegisterNuiCallbackType('appearance_change_prop');

  on('__cfx_nui:appearance_get_settings_and_data', (_: any, cb: (arg: any) => void) => {
    const appearanceData = getAppearance();
    const appearanceSettings = getAppearanceSettings(appearanceData);

    cb({ appearanceData, appearanceSettings });
  });

  on('__cfx_nui:appearance_change_model', (appearance: PedAppearance, cb: (arg: any) => void) => {
    setPlayerModel(appearance.model);

    cb(getAppearanceSettings(appearance));
  });

  on(
    '__cfx_nui:appearance_change_component',
    (components: PedComponent[], cb: (arg: any) => void) => {
      setPedComponents(PlayerPedId(), components);

      cb(getComponentsSettings(components));
    },
  );

  on('__cfx_nui:appearance_change_prop', (props: PedProp[], cb: (arg: any) => void) => {
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
    (faceFeatures: PedFaceFeatures, cb: (arg: any) => void) => {
      cb({});
      console.log(faceFeatures);
      setPedFaceFeatures(PlayerPedId(), faceFeatures);
    },
  );

  on(
    '__cfx_nui:appearance_change_head_overlay',
    (headOverlays: PedHeadOverlays, cb: (arg: any) => void) => {
      cb({});
      console.log(headOverlays.beard);
      setPedHeadOverlays(PlayerPedId(), headOverlays);
    },
  );

  on('__cfx_nui:appearance_change_hair', (hair: PedHair, cb: (arg: any) => void) => {
    cb({});
    setPedHair(PlayerPedId(), hair);
  });

  on('__cfx_nui:appearance_change_eye_color', (eyeColor: number, cb: (arg: any) => void) => {
    cb({});
    setPedEyeColor(PlayerPedId(), eyeColor);
  });
}
