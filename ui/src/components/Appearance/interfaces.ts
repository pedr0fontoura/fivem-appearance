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
}

export interface PedSettings {
  model: {
    items: string[];
    clientValue: string;
  };
}

export interface ComponentSettings {
  component_id: number;
  drawable: {
    min: number;
    max: number;
    clientValue: number;
  };
  texture: {
    min: number;
    max: number;
    clientValue: number;
  };
}

export interface PropSettings {
  prop_id: number;
  drawable: {
    min: number;
    max: number;
    clientValue: number;
  };
  texture: {
    min: number;
    max: number;
    clientValue: number;
  };
}

export interface HeadBlendSettings {
  shape: {
    min: number;
    max: number;
    clientValue: number;
  };
  skin: {
    min: number;
    max: number;
    clientValue: number;
  };
  mix: {
    min: number;
    max: number;
    factor: number;
    clientValue: number;
  };
}

type FaceFeaturesSettingsKey = keyof PedFaceFeatures;

type FaceFeaturesSettingsValue = { min: number; max: number; factor: number; clientValue: number };

export type FaceFeaturesSettings = Record<FaceFeaturesSettingsKey, FaceFeaturesSettingsValue>;

type HeadOverlaysSettingsKey = keyof PedHeadOverlays;

type HeadOverlaysSettingsValue = {
  style: {
    min: number;
    max: number;
    clientValue: number;
  };
  opacity: {
    min: number;
    max: number;
    factor: number;
    clientValue: number;
  };
  color?: {
    items: number[][];
    clientValue: number;
  };
};

export type HeadOverlaysSettings = Record<HeadOverlaysSettingsKey, HeadOverlaysSettingsValue>;

export interface HairSettings {
  style: {
    min: number;
    max: number;
    clientValue: number;
  };
  colors: number[][];
  highlights: number[][];
}

export interface EyeColorSettings {
  min: number;
  max: number;
  clientValue: number;
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
}

export interface CameraState {
  head: boolean;
  body: boolean;
  bottom: boolean;
}

export interface RotateState {
  left: boolean;
  right: boolean;
}
