export const DEFAULT_HEAD_BLEND: PedHeadBlend = {
  shapeFirst: 0,
  shapeSecond: 0,
  shapeMix: 0,
  skinFirst: 0,
  skinSecond: 0,
  skinMix: 0,
};

export const DEFAULT_FACE_FEATURES: PedFaceFeatures = {
  noseWidth: 0,
  nosePeakHigh: 0,
  nosePeakSize: 0,
  noseBoneHigh: 0,
  nosePeakLowering: 0,
  noseBoneTwist: 0,
  eyeBrownHigh: 0,
  eyeBrownForward: 0,
  cheeksBoneHigh: 0,
  cheeksBoneWidth: 0,
  cheeksWidth: 0,
  eyesOpening: 0,
  lipsThickness: 0,
  jawBoneWidth: 0,
  jawBoneBackSize: 0,
  chinBoneLowering: 0,
  chinBoneLenght: 0,
  chinBoneSize: 0,
  chinHole: 0,
  neckThickness: 0,
};

export const DEFAULT_HEAD_OVERLAYS: PedHeadOverlays = {
  blemishes: {
    style: 0,
    opacity: 0,
  },
  beard: {
    style: 0,
    opacity: 0,
    color: 0,
  },
  eyebrows: {
    style: 0,
    opacity: 0,
    color: 0,
  },
  ageing: {
    style: 0,
    opacity: 0,
  },
  makeUp: {
    style: 0,
    opacity: 0,
    color: 0,
  },
  blush: {
    style: 0,
    opacity: 0,
    color: 0,
  },
  complexion: {
    style: 0,
    opacity: 0,
  },
  sunDamage: {
    style: 0,
    opacity: 0,
  },
  lipstick: {
    style: 0,
    opacity: 0,
    color: 0,
  },
  moleAndFreckles: {
    style: 0,
    opacity: 0,
  },
  chestHair: {
    style: 0,
    opacity: 0,
    color: 0,
  },
  bodyBlemishes: {
    style: 0,
    opacity: 0,
  },
};

export const DEFAULT_HAIR: PedHair = {
  style: 0,
  color: 0,
  highlight: 0,
};

export const DEFAULT_COMPONENTS: PedComponent[] = [
  { component_id: 0, drawable: 15, texture: 0 },
  { component_id: 1, drawable: 15, texture: 0 },
  { component_id: 2, drawable: 15, texture: 0 },
  { component_id: 3, drawable: 15, texture: 0 },
  { component_id: 4, drawable: 15, texture: 0 },
  { component_id: 5, drawable: 15, texture: 0 },
  { component_id: 6, drawable: 15, texture: 0 },
  { component_id: 7, drawable: 15, texture: 0 },
  { component_id: 8, drawable: 15, texture: 0 },
  { component_id: 9, drawable: 15, texture: 0 },
  { component_id: 10, drawable: 15, texture: 0 },
  { component_id: 11, drawable: 15, texture: 0 },
];

export const DEFAULT_PROPS: PedProp[] = [
  { prop_id: 0, drawable: -1, texture: 0 },
  { prop_id: 1, drawable: -1, texture: 0 },
  { prop_id: 2, drawable: -1, texture: 0 },
  { prop_id: 6, drawable: -1, texture: 0 },
  { prop_id: 7, drawable: -1, texture: 0 },
];

export const DEFAULT_APPEARANCE: PedAppearance = {
  model: 'mp_m_freemode_01',
  components: DEFAULT_COMPONENTS,
  props: DEFAULT_PROPS,
  headBlend: DEFAULT_HEAD_BLEND,
  faceFeatures: DEFAULT_FACE_FEATURES,
  headOverlays: DEFAULT_HEAD_OVERLAYS,
  hair: DEFAULT_HAIR,
  eyeColor: 0,
};
