import { Delay, isPedFreemodeModel, getPedHairDecoration } from './utils';

import { FACE_FEATURES, HEAD_OVERLAYS } from './constants';

import Customization from './modules/customization';

export async function setPlayerModel(model: string): Promise<void> {
  if (!model) return;

  if (!IsModelInCdimage(model)) return;

  RequestModel(model);

  while (!HasModelLoaded(model)) {
    await Delay(0);
  }

  SetPlayerModel(PlayerId(), model);

  SetModelAsNoLongerNeeded(model);

  const playerPed = PlayerPedId();

  if (isPedFreemodeModel(playerPed)) {
    SetPedDefaultComponentVariation(playerPed);
    SetPedHeadBlendData(playerPed, 0, 0, 0, 0, 0, 0, 0, 0, 0, false);
  }
}

export function setPedHeadBlend(ped: number, headBlend: PedHeadBlend): void {
  if (!headBlend) return;

  const { shapeFirst, shapeSecond, shapeMix, skinFirst, skinSecond, skinMix } = headBlend;

  SetPedHeadBlendData(
    ped,
    shapeFirst,
    shapeSecond,
    0,
    skinFirst,
    skinSecond,
    0,
    shapeMix,
    skinMix,
    0,
    false,
  );
}

export function setPedFaceFeatures(ped: number, faceFeatures: PedFaceFeatures): void {
  if (!faceFeatures) return;

  FACE_FEATURES.forEach((key, index) => {
    const faceFeature = faceFeatures[key];

    SetPedFaceFeature(ped, index, faceFeature);
  });
}

export function setPedHeadOverlays(ped: number, headOverlays: PedHeadOverlays): void {
  if (!headOverlays) return;

  HEAD_OVERLAYS.forEach((key, index) => {
    const headOverlay: PedHeadOverlayValue = headOverlays[key];

    SetPedHeadOverlay(ped, index, headOverlay.style, headOverlay.opacity);

    if (headOverlay.color) {
      let colorType = 1;

      const isMakeupColor = {
        blush: true,
        lipstick: true,
        makeUp: true,
      };

      if (isMakeupColor[key]) {
        colorType = 2;
      }

      SetPedHeadOverlayColor(ped, index, colorType, headOverlay.color, headOverlay.color);
    }
  });
}

export function setPedHair(ped: number, hair: PedHair): void {
  if (!hair) return;

  const { style, color, highlight } = hair;

  SetPedComponentVariation(ped, 2, style, 0, 0);

  SetPedHairColor(ped, color, highlight);

  const hairDecoration = getPedHairDecoration(ped, style);

  ClearPedDecorations(ped);

  if (hairDecoration) {
    const { collection, overlay } = hairDecoration;

    AddPedDecorationFromHashes(ped, GetHashKey(collection), GetHashKey(overlay));
  }
}

export function setPedEyeColor(ped: number, eyeColor: number): void {
  if (!eyeColor) return;

  SetPedEyeColor(ped, eyeColor);
}

export function setPedComponent(ped: number, component: PedComponent): void {
  if (!component) return;

  const { component_id, drawable, texture } = component;

  const excludedFromFreemodeModels = {
    0: true,
    2: true,
  };

  if (excludedFromFreemodeModels[component_id] && isPedFreemodeModel(ped)) {
    return;
  }

  SetPedComponentVariation(ped, component_id, drawable, texture, 0);
}

export function setPedComponents(ped: number, components: PedComponent[]): void {
  if (!components) return;
  components.forEach(component => setPedComponent(ped, component));
}

export function setPedProp(ped: number, prop: PedProp): void {
  if (!prop) return;

  const { prop_id, drawable, texture } = prop;

  if (drawable === -1) {
    ClearPedProp(ped, prop_id);
  } else {
    SetPedPropIndex(ped, prop_id, drawable, texture, false);
  }
}

export function setPedProps(ped: number, props: PedProp[]): void {
  if (!props) return;

  props.forEach(prop => setPedProp(ped, prop));
}

export async function setPlayerAppearance(appearance: PedAppearance): Promise<void> {
  if (!appearance) return;

  const {
    model,
    components,
    props,
    headBlend,
    faceFeatures,
    headOverlays,
    hair,
    eyeColor,
  } = appearance;

  await setPlayerModel(model);

  const playerPed = PlayerPedId();

  setPedComponents(playerPed, components);

  setPedProps(playerPed, props);

  if (headBlend) {
    setPedHeadBlend(playerPed, headBlend);
  }

  if (faceFeatures) {
    setPedFaceFeatures(playerPed, faceFeatures);
  }

  if (headOverlays) {
    setPedHeadOverlays(playerPed, headOverlays);
  }

  if (hair) {
    setPedHair(playerPed, hair);
  }

  if (eyeColor) {
    setPedEyeColor(playerPed, eyeColor);
  }
}

function setPedAppearance(ped: number, appearance: Omit<PedAppearance, 'model'>): void {
  if (!appearance) return;

  const { components, props, headBlend, faceFeatures, headOverlays, hair, eyeColor } = appearance;

  setPedComponents(ped, components);

  setPedProps(ped, props);

  if (headBlend) {
    setPedHeadBlend(ped, headBlend);
  }

  if (faceFeatures) {
    setPedFaceFeatures(ped, faceFeatures);
  }

  if (headOverlays) {
    setPedHeadOverlays(ped, headOverlays);
  }

  if (hair) {
    setPedHair(ped, hair);
  }

  if (eyeColor) {
    setPedEyeColor(ped, eyeColor);
  }
}

function init(): void {
  global.Delay = Delay;

  Customization.loadModule();

  exports('setPlayerAppearance', setPlayerAppearance);
  exports('setPedAppearance', setPedAppearance);
}

addEventListener('onResourceStart', (resource: string) => {
  if (resource !== GetCurrentResourceName()) {
    return;
  }

  init();
});

addEventListener('onResourceStop', (resource: string) => {
  if (resource !== GetCurrentResourceName()) {
    return;
  }

  SetNuiFocus(false, false);
  SetNuiFocusKeepInput(false);
});
