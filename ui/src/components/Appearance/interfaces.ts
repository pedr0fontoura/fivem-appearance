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
  headBlend?: PedHeadBlend;
  faceFeatures?: PedFaceFeatures;
  headOverlays?: PedHeadOverlays;
  hair?: PedHair;
  eyeColor?: number;
}
