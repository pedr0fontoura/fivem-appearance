export interface PedHeadBlend {
  shapeFirst: number;
  shapeSecond: number;
  skinFirst: number;
  skinSecond: number;
  shapeMix: number;
  skinMix: number;
}

export interface PedFaceFeatures {
  noseWidth: number;
  nosePeakHigh: number;
  nosePeakSize: number;
  noseBoneHigh: number;
  nosePeakLowering: number;
  noseBoneTwist: number;
  eyeBrownHigh: number;
  eyeBrownForward: number;
  cheeksBoneHigh: number;
  cheeksBoneWidth: number;
  cheeksWidth: number;
  eyesOpening: number;
  lipsThickness: number;
  jawBoneWidth: number;
  jawBoneBackSize: number;
  chinBoneLowering: number;
  chinBoneLenght: number;
  chinBoneSize: number;
  chinHole: number;
  neckThickness: number;
}

export interface PedHeadOverlayValue {
  style: number;
  opacity: number;
  color?: number;
  secondColor?: number;
}

export interface PedHeadOverlays {
  blemishes: PedHeadOverlayValue;
  beard: PedHeadOverlayValue;
  eyebrows: PedHeadOverlayValue;
  ageing: PedHeadOverlayValue;
  makeUp: PedHeadOverlayValue;
  blush: PedHeadOverlayValue;
  complexion: PedHeadOverlayValue;
  sunDamage: PedHeadOverlayValue;
  lipstick: PedHeadOverlayValue;
  moleAndFreckles: PedHeadOverlayValue;
  chestHair: PedHeadOverlayValue;
  bodyBlemishes: PedHeadOverlayValue;
}

export interface PedHair {
  style: number;
  color: number;
  highlight: number;
}

export interface PedComponent {
  component_id: number;
  drawable: number;
  texture: number;
}

export interface PedProp {
  prop_id: number;
  drawable: number;
  texture: number;
}

export interface PedAppearance {
  model: string;
  components: PedComponent[];
  props: PedProp[];
  headBlend: PedHeadBlend;
  faceFeatures: PedFaceFeatures;
  headOverlays: PedHeadOverlays;
  hair: PedHair;
  eyeColor: number;
  tattoos: TattooList;
}

export interface PedSettings {
  model: {
    items: string[];
  };
}

export interface ComponentSettings {
  component_id: number;
  drawable: {
    min: number;
    max: number;
  };
  texture: {
    min: number;
    max: number;
  };
}

export interface PropSettings {
  prop_id: number;
  drawable: {
    min: number;
    max: number;
  };
  texture: {
    min: number;
    max: number;
  };
}

export interface HeadBlendSettings {
  shapeFirst: {
    min: number;
    max: number;
  };
  shapeSecond: {
    min: number;
    max: number;
  };
  skinFirst: {
    min: number;
    max: number;
  };
  skinSecond: {
    min: number;
    max: number;
  };
  shapeMix: {
    min: number;
    max: number;
    factor: number;
  };
  skinMix: {
    min: number;
    max: number;
    factor: number;
  };
}

type FaceFeaturesSettingsKey = keyof PedFaceFeatures;

type FaceFeaturesSettingsValue = { min: number; max: number; factor: number };

export type FaceFeaturesSettings = Record<FaceFeaturesSettingsKey, FaceFeaturesSettingsValue>;

type HeadOverlaysSettingsKey = keyof PedHeadOverlays;

type HeadOverlaysSettingsValue = {
  style: {
    min: number;
    max: number;
  };
  opacity: {
    min: number;
    max: number;
    factor: number;
  };
  color?: {
    items: number[][];
  };
};

export type HeadOverlaysSettings = Record<HeadOverlaysSettingsKey, HeadOverlaysSettingsValue>;

export interface HairSettings {
  style: {
    min: number;
    max: number;
  };
  color: {
    items: number[][];
  };
  highlight: {
    items: number[][];
  };
}

export interface EyeColorSettings {
  min: number;
  max: number;
}

export interface AppearanceSettings {
  ped: PedSettings;
  components: ComponentSettings[];
  props: PropSettings[];
  headBlend: HeadBlendSettings;
  faceFeatures: FaceFeaturesSettings;
  headOverlays: HeadOverlaysSettings;
  hair: HairSettings;
  eyeColor: EyeColorSettings;
  tattoos: TattoosSettings;
}

export interface CustomizationConfig {
  ped: boolean;
  headBlend: boolean;
  faceFeatures: boolean;
  headOverlays: boolean;
  components: boolean;
  props: boolean;
  tattoos: boolean;
  allowExit: boolean;
  automaticFade: boolean;
}

export interface CameraState {
  head: boolean;
  body: boolean;
  bottom: boolean;
}

export interface ClothesState {
  head: boolean;
  body: boolean;
  bottom: boolean;
}

export interface RotateState {
  left: boolean;
  right: boolean;
}

export interface Tattoo {
  name: string;
  label: string;
  hashMale: string;
  hashFemale: string;
  zone: string;
  collection: string;
}

export interface TattooList {
  [key: string]: Tattoo[];
}

export interface TattoosSettings {
  items: TattooList;
}
