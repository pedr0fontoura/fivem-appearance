declare function Delay(ms: number): Promise<void>;

interface Vector3 {
  x: number;
  y: number;
  z: number;
}

interface PedHeadBlend {
  shapeFirst: number;
  shapeSecond: number;
  skinFirst: number;
  skinSecond: number;
  shapeMix: number;
  skinMix: number;
}

declare enum FaceFeatures {
  noseWidth,
  nosePeakHigh,
  nosePeakSize,
  noseBoneHigh,
  nosePeakLowering,
  noseBoneTwist,
  eyeBrownHigh,
  eyeBrownForward,
  cheeksBoneHigh,
  cheeksBoneWidth,
  cheeksWidth,
  eyesOpening,
  lipsThickness,
  jawBoneWidth,
  jawBoneBackSize,
  chinBoneLowering,
  chinBoneLenght,
  chinBoneSize,
  chinHole,
  neckThickness,
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
}

declare enum HeadOverlays {
  blemishes,
  beard,
  eyebrows,
  ageing,
  makeUp,
  blush,
  complexion,
  sunDamage,
  lipstick,
  moleAndFreckles,
  chestHair,
  bodyBlemishes,
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
  headBlend?: PedHeadBlend;
  faceFeatures?: PedFaceFeatures;
  headOverlays?: PedHeadOverlays;
  hair?: PedHair;
  eyeColor?: number;
}
