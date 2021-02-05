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

interface ComponentSettings {
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

interface PropSettings {
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

interface HeadBlendSettings {
  shape: {
    min: number;
    max: number;
  };
  skin: {
    min: number;
    max: number;
  };
  mix: {
    min: number;
    max: number;
    factor: number;
  };
}

interface FaceFeaturesSettings {
  min: number;
  max: number;
  factor: number;
}

interface HeadOverlayValueSettings {
  style: {
    min: number;
    max: number;
  };
  opacity: {
    min: number;
    max: number;
    factor: number;
  };
  colors?: number[][];
}

interface HeadOverlaysSettings {
  blemishes: HeadOverlayValueSettings;
  beard: HeadOverlayValueSettings;
  eyebrows: HeadOverlayValueSettings;
  ageing: HeadOverlayValueSettings;
  makeUp: HeadOverlayValueSettings;
  blush: HeadOverlayValueSettings;
  complexion: HeadOverlayValueSettings;
  sunDamage: HeadOverlayValueSettings;
  lipstick: HeadOverlayValueSettings;
  moleAndFreckles: HeadOverlayValueSettings;
  chestHair: HeadOverlayValueSettings;
  bodyBlemishes: HeadOverlayValueSettings;
}

interface HairSettings {
  style: {
    min: number;
    max: number;
  };
  colors: number[][];
  highlights: number[][];
}

interface EyeColorSettings {
  min: number;
  max: number;
}

export interface AppearanceSettings {
  models: string[];
  components: ComponentSettings[];
  props: PropSettings[];
  headBlend: HeadBlendSettings;
  faceFeatures: FaceFeaturesSettings;
  headOverlays: HeadOverlaysSettings;
  hair: HairSettings;
  eyeColor: EyeColorSettings;
}
