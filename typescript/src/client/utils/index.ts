import {
  FACE_FEATURES,
  HEAD_OVERLAYS,
  HAIR_DECORATIONS,
  PED_COMPONENTS_IDS,
  PED_PROPS_IDS,
} from '../constants';

const GET_PED_HEAD_BLEND_DATA = '0x2746bd9d88c5c5d0';

export const Delay = (ms: number): Promise<void> => new Promise(res => setTimeout(res, ms));

export const isPedFreemodeModel = (ped: number): boolean => {
  const entityModel = GetEntityModel(ped);

  const freemodeMale = GetHashKey('mp_m_freemode_01');
  const freemodeFemale = GetHashKey('mp_f_freemode_01');

  return entityModel === freemodeMale || entityModel === freemodeFemale;
};

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

  const { 0: shapeFirst, 2: shapeSecond, 6: skinFirst, 8: skinSecond } = new Uint32Array(buffer);

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
    const [_, value, colorType, firstColor, secondColor, opacity] = GetPedHeadOverlayData(
      ped,
      index,
    );

    const safeValue = value === 255 ? 0 : value;
    const normalizedOpacity = parseFloat(opacity.toFixed(1));

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
