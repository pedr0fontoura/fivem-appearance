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
