import { FACE_FEATURES, HEAD_OVERLAYS } from '../../constants';

const GET_PED_HEAD_BLEND_DATA = '0x2746bd9d88c5c5d0';

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
