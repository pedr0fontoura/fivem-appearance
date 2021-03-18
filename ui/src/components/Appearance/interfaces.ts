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

export interface Locales {
  modal: {
    save: {
      title: string;
      description: string;
    };
    exit: {
      title: string;
      description: string;
    };
    accept: string;
    decline: string;
  };
  ped: {
    title: string;
    model: string;
  };
  headBlend: {
    title: string;
    shape: {
      title: string;
      firstOption: string;
      secondOption: string;
      mix: string;
    };
    skin: {
      title: string;
      firstOption: string;
      secondOption: string;
      mix: string;
    };
  };
  faceFeatures: {
    title: string;
    nose: {
      title: string;
      width: string;
      height: string;
      size: string;
      boneHeight: string;
      boneTwist: string;
      peakHeight: string;
    };
    eyebrows: {
      title: string;
      height: string;
      depth: string;
    };
    cheeks: {
      title: string;
      boneHeight: string;
      boneWidth: string;
      width: string;
    };
    eyesAndMouth: {
      title: string;
      eyesOpening: string;
      lipsThickness: string;
    };
    jaw: {
      title: string;
      width: string;
      size: string;
    };
    chin: {
      title: string;
      lowering: string;
      length: string;
      size: string;
      hole: string;
    };
    neck: {
      title: string;
      thickness: string;
    };
  };
  headOverlays: {
    title: string;
    hair: {
      title: string;
      style: string;
      color: string;
      highlight: string;
    };
    opacity: string;
    style: string;
    color: string;
    blemishes: string;
    beard: string;
    eyebrows: string;
    ageing: string;
    makeUp: string;
    blush: string;
    complexion: string;
    sunDamage: string;
    lipstick: string;
    moleAndFreckles: string;
    chestHair: string;
    bodyBlemishes: string;
    eyeColor: string;
  };
  components: {
    title: string;
    drawable: string;
    texture: string;
    mask: string;
    upperBody: string;
    lowerBody: string;
    bags: string;
    shoes: string;
    scarfAndChains: string;
    shirt: string;
    bodyArmor: string;
    decals: string;
    jackets: string;
  };
  props: {
    title: string;
    drawable: string;
    texture: string;
    hats: string;
    glasses: string;
    ear: string;
    watches: string;
    bracelets: string;
  };
}
