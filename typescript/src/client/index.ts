import { Delay, isPedFreemodeModel } from './utils';

import { getPedHairDecal } from './utils';

import {
  DEFAULT_HEAD_BLEND,
  DEFAULT_FACE_FEATURES,
  DEFAULT_HEAD_OVERLAYS,
  DEFAULT_HAIR,
  DEFAULT_COMPONENTS,
  DEFAULT_PROPS,
  FACE_FEATURES,
  HEAD_OVERLAYS,
} from './constants';

import Customization from './modules/customization';

export async function setPlayerModel(model: string): Promise<void> {
  if (!model) return;

  RequestModel(model);

  while (!HasModelLoaded(model)) {
    await Delay(0);
  }

  SetPlayerModel(PlayerId(), model);

  SetModelAsNoLongerNeeded(model);

  const playerPed = PlayerPedId();

  SetPedDefaultComponentVariation(playerPed);

  if (isPedFreemodeModel(playerPed)) {
    SetPedHeadBlendData(playerPed, 0, 0, 0, 0, 0, 0, 0, 0, 0, false);
  }

  // Emit event for async hooks since async exports are not a thing
  emit('cfx-appearance:playerModelChanged');
}

export function setPedHeadBlend(ped: number, headBlend: PedHeadBlend = DEFAULT_HEAD_BLEND): void {
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

export function setPedFaceFeatures(
  ped: number,
  faceFeatures: PedFaceFeatures = DEFAULT_FACE_FEATURES,
): void {
  FACE_FEATURES.forEach((key, index) => {
    const faceFeature = faceFeatures[key];

    SetPedFaceFeature(ped, index, faceFeature);
  });
}

export function setPedHeadOverlays(
  ped: number,
  headOverlays: PedHeadOverlays = DEFAULT_HEAD_OVERLAYS,
): void {
  HEAD_OVERLAYS.forEach((key, index) => {
    const headOverlay: PedHeadOverlayValue = headOverlays[key];

    SetPedHeadOverlay(ped, index, headOverlay.style, headOverlay.opacity);

    if (headOverlay.color) {
      let colorType = 1;

      if (key === ('blush' || 'lipstick')) {
        colorType = 2;
      }

      SetPedHeadOverlayColor(ped, index, colorType, headOverlay.color, headOverlay.color);
    }
  });
}

export function setPedHair(ped: number, hair: PedHair = DEFAULT_HAIR): void {
  const { style, color, highlight } = hair;

  SetPedComponentVariation(ped, 2, style, 0, 0);

  SetPedHairColor(ped, color, highlight);

  const hairDecal = getPedHairDecal(ped, style);

  ClearPedDecorations(ped);

  if (hairDecal) {
    const { collection, overlay } = hairDecal;

    AddPedDecorationFromHashes(ped, GetHashKey(collection), GetHashKey(overlay));
  }
}

export function setPedEyeColor(ped: number, eyeColor = 0): void {
  SetPedEyeColor(ped, eyeColor);
}

export function setPedComponents(
  ped: number,
  components: PedComponent[] = DEFAULT_COMPONENTS,
): void {
  const excludeFromFreemodeModels = 2 || 1;
  components.forEach(({ component_id, drawable, texture }) => {
    if (!(component_id === excludeFromFreemodeModels && isPedFreemodeModel(ped))) {
      SetPedComponentVariation(ped, component_id, drawable, texture, 0);
    }
  });
}

export function setPedProps(ped: number, props: PedProp[] = DEFAULT_PROPS): void {
  props.forEach(({ prop_id, drawable, texture }) => {
    if (drawable === -1) {
      ClearPedProp(ped, prop_id);
    } else {
      SetPedPropIndex(ped, prop_id, drawable, texture, false);
    }
  });
}

async function setPlayerAppearance(appearance: PedAppearance): Promise<void> {
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

  // Emit event for async hooks since async exports are not a thing
  emit('cfx-appearance:playerAppearanceChanged');
}

function setPedAppearance(ped: number, appearance: Omit<PedAppearance, 'model'>): void {
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
