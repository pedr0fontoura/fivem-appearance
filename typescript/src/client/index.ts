import { Delay, isPedFreemodeModel } from './utils';

import {
  FACE_FEATURES,
  HEAD_OVERLAYS,
  HAIR_DECORATIONS,
  PED_COMPONENTS_IDS,
  PED_PROPS_IDS,
} from './constants';

import Customization from './modules/customization';

const GET_PED_HEAD_BLEND_DATA = '0x2746bd9d88c5c5d0';

export const pedModels: string[] = JSON.parse(
  LoadResourceFile(GetCurrentResourceName(), 'peds.json'),
);

export const pedModelsByHash = pedModels.reduce((object, model) => {
  return { ...object, [GetHashKey(model)]: model };
}, {});

export const getPedComponents = (ped: number): PedComponent[] => {
  const components = [];

  PED_COMPONENTS_IDS.forEach(componentId => {
    components.push({
      component_id: componentId,
      drawable: GetPedDrawableVariation(ped, componentId),
      texture: GetPedTextureVariation(ped, componentId),
    });
  });

  return components;
};

export const getPedProps = (ped: number): PedProp[] => {
  const props = [];

  PED_PROPS_IDS.forEach(propId => {
    props.push({
      prop_id: propId,
      drawable: GetPedPropIndex(ped, propId),
      texture: GetPedPropTextureIndex(ped, propId),
    });
  });

  return props;
};

export function getPedHeadBlendData(ped: number): PedHeadBlend {
  // int, int, int, int, int, int, float, float, float, bool
  const buffer = new ArrayBuffer(80);

  global.Citizen.invokeNative(GET_PED_HEAD_BLEND_DATA, ped, new Uint32Array(buffer));

  /*   
    0: shapeFirst,
    2: shapeSecond,
    4: shapeThird,
    6: skinFirst,
    8: skinSecond,
    10: skinThird,
    18: isParent,
  */
  const { 0: shapeFirst, 2: shapeSecond, 6: skinFirst, 8: skinSecond } = new Uint32Array(buffer);

  // 0: shapeMix, 2: skinMix, 4: thirdMix
  const { 0: shapeMix, 2: skinMix } = new Float32Array(buffer, 48);

  const normalizedShapeMix = parseFloat(shapeMix.toFixed(1));
  const normalizedSkinMix = parseFloat(skinMix.toFixed(1));

  return {
    shapeFirst,
    shapeSecond,
    skinFirst,
    skinSecond,
    shapeMix: normalizedShapeMix,
    skinMix: normalizedSkinMix,
  };
}

export function getPedFaceFeatures(ped: number): PedFaceFeatures {
  const faceFeatures = FACE_FEATURES.reduce((object, feature, index) => {
    const normalizedValue = parseFloat(GetPedFaceFeature(ped, index).toFixed(1));

    return { ...object, [feature]: normalizedValue };
  }, {} as PedFaceFeatures);

  return faceFeatures;
}

export function getPedHeadOverlays(ped: number): PedHeadOverlays {
  const headOverlays = HEAD_OVERLAYS.reduce((object, overlay, index) => {
    // success, value, colorType, firstColor, secondColor, opacity
    const [, value, , firstColor, , opacity] = GetPedHeadOverlayData(ped, index);

    const hasOverlay = value !== 255;

    const safeValue = hasOverlay ? value : 0;
    const normalizedOpacity = hasOverlay ? parseFloat(opacity.toFixed(1)) : 0;

    return {
      ...object,
      [overlay]: { style: safeValue, opacity: normalizedOpacity, color: firstColor },
    };
  }, {} as PedHeadOverlays);

  return headOverlays;
}

export function getPedHair(ped: number): PedHair {
  return {
    style: GetPedDrawableVariation(ped, 2),
    color: GetPedHairColor(ped),
    highlight: GetPedHairHighlightColor(ped),
  };
}

const getPedHairDecorationType = (ped: number): 'male' | 'female' => {
  const pedModel = GetEntityModel(ped);

  let hairDecorationType: 'male' | 'female';

  if (pedModel === GetHashKey('mp_m_freemode_01')) {
    hairDecorationType = 'male';
  } else if (pedModel === GetHashKey('mp_f_freemode_01')) {
    hairDecorationType = 'female';
  }

  return hairDecorationType;
};

export const getPedHairDecoration = (ped: number, hairStyle: number): HairDecoration => {
  const hairDecorationType = getPedHairDecorationType(ped);

  if (!hairDecorationType) return;

  const hairDecoration = HAIR_DECORATIONS[hairDecorationType].find(
    decoration => decoration.id === hairStyle,
  );

  return hairDecoration;
};

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

    if (headOverlay.color || headOverlay.color === 0) {
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
  Customization.loadModule();

  exports('setPlayerAppearance', setPlayerAppearance);
  exports('setPedAppearance', setPedAppearance);
}

init();

addEventListener('onResourceStop', (resource: string) => {
  if (resource !== GetCurrentResourceName()) {
    return;
  }

  SetNuiFocus(false, false);
  SetNuiFocusKeepInput(false);
});
