interface Vector3 {
  x: number;
  y: number;
  z: number;
}

interface HairDecoration {
  id: number;
  collection: string;
  overlay: string;
}

interface HairDecorations {
  male: HairDecoration[];
  female: HairDecoration[];
}

interface PedHeadBlend {
  shapeFirst: number;
  shapeSecond: number;
  skinFirst: number;
  skinSecond: number;
  shapeMix: number;
  skinMix: number;
}

interface PedFaceFeatures {
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

interface PedHeadOverlayValue {
  style: number;
  opacity: number;
  color?: number;
  secondColor?: number;
}

interface PedHeadOverlays {
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

interface PedHair {
  style: number;
  color: number;
  highlight: number;
}

interface PedComponent {
  component_id: number;
  drawable: number;
  texture: number;
}

interface PedProp {
  prop_id: number;
  drawable: number;
  texture: number;
}

interface PedAppearance {
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

interface PedSettings {
  model: {
    items: string[];
  };
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

type FaceFeaturesSettings = Record<FaceFeaturesSettingsKey, FaceFeaturesSettingsValue>;

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

type HeadOverlaysSettings = Record<HeadOverlaysSettingsKey, HeadOverlaysSettingsValue>;

interface HairSettings {
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

interface EyeColorSettings {
  min: number;
  max: number;
}

interface AppearanceSettings {
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

interface CustomizationConfig {
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

interface CameraState {
  head: boolean;
  body: boolean;
  bottom: boolean;
}

interface RotateState {
  left: boolean;
  right: boolean;
}

interface Tattoo {
  name: string;
  label: string;
  hashMale: string;
  hashFemale: string;
  zone: string;
  collection: string;
}

interface TattooList {
  [key: string]: Tattoo[];
}

interface TattoosSettings {
  items: TattooList;
}

interface PreviewTattoo {
  data: TattooList;
  tattoo: Tattoo;
}

interface Animation {
  dict: string;
  anim: string;
  move: number;
  duration: number;
}

interface AnimationsGroup {
  on: Animation;
  off: Animation;
}

interface PropsGroup {
  male: Array<number[]>;
  female: Array<number[]>;
}
interface ClothesGroup {
  animations: AnimationsGroup;
  props: PropsGroup;
}

interface DataClothes {
  head: ClothesGroup;
  body: ClothesGroup;
  bottom: ClothesGroup;
}

interface WearClothes {
  data: PedAppearance;
  key: string;
}
