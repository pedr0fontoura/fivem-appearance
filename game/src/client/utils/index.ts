export const MP_FREEMODE_MALE = GetHashKey('mp_m_freemode_01');
export const MP_FREEMODE_FEMALE = GetHashKey('mp_f_freemode_01');

export const Delay = (ms: number): Promise<void> => new Promise(res => setTimeout(res, ms));

export const isPedFreemodeModel = (pedModel: number): boolean => {
  return pedModel === MP_FREEMODE_MALE || pedModel === MP_FREEMODE_FEMALE;
};

export const isHardcodedHairDecoration = (
  variableToCheck: any,
): variableToCheck is HardcodedHairDecoration => {
  const { collection, overlay } = variableToCheck as HardcodedHairDecoration;

  return typeof collection === 'string' && typeof overlay === 'string';
};

export function arrayToVector3(coords: number[]): Vector3 {
  return {
    x: coords[0],
    y: coords[1],
    z: coords[2],
  };
}
