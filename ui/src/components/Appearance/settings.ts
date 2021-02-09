import { PedAppearance, AppearanceSettings } from './interfaces';

export const APPEARANCE_INITIAL_STATE: PedAppearance = {
  model: 'mp_m_freemode_01',
  components: [
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
  ],
  props: [
    { prop_id: 0, drawable: -1, texture: 0 },
    { prop_id: 1, drawable: -1, texture: 0 },
    { prop_id: 2, drawable: -1, texture: 0 },
    { prop_id: 6, drawable: -1, texture: 0 },
    { prop_id: 7, drawable: -1, texture: 0 },
  ],
  headBlend: {
    shapeFirst: 0,
    shapeSecond: 0,
    shapeMix: 0,
    skinFirst: 0,
    skinSecond: 0,
    skinMix: 0,
  },
  faceFeatures: {
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
  },
  headOverlays: {
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
  },
  hair: {
    style: 0,
    color: 0,
    highlight: 0,
  },
  eyeColor: 0,
};

export const SETTINGS_INITIAL_STATE: AppearanceSettings = {
  ped: {
    model: {
      items: ['mp_m_freemode_01', 'mp_f_freemode_01', 'player_zero'],
    },
  },
  components: [
    { component_id: 0, drawable: { min: 0, max: 255 }, texture: { min: 0, max: 255 } },
    { component_id: 1, drawable: { min: 0, max: 255 }, texture: { min: 0, max: 255 } },
    { component_id: 2, drawable: { min: 0, max: 255 }, texture: { min: 0, max: 255 } },
    { component_id: 3, drawable: { min: 0, max: 255 }, texture: { min: 0, max: 255 } },
    { component_id: 4, drawable: { min: 0, max: 255 }, texture: { min: 0, max: 255 } },
    { component_id: 5, drawable: { min: 0, max: 255 }, texture: { min: 0, max: 255 } },
    { component_id: 6, drawable: { min: 0, max: 255 }, texture: { min: 0, max: 255 } },
    { component_id: 7, drawable: { min: 0, max: 255 }, texture: { min: 0, max: 255 } },
    { component_id: 8, drawable: { min: 0, max: 255 }, texture: { min: 0, max: 255 } },
    { component_id: 9, drawable: { min: 0, max: 255 }, texture: { min: 0, max: 255 } },
    { component_id: 10, drawable: { min: 0, max: 255 }, texture: { min: 0, max: 255 } },
    { component_id: 11, drawable: { min: 0, max: 255 }, texture: { min: 0, max: 255 } },
  ],
  props: [
    { prop_id: 0, drawable: { min: -1, max: 255 }, texture: { min: 0, max: 255 } },
    { prop_id: 1, drawable: { min: -1, max: 255 }, texture: { min: 0, max: 255 } },
    { prop_id: 2, drawable: { min: -1, max: 255 }, texture: { min: 0, max: 255 } },
    { prop_id: 6, drawable: { min: -1, max: 255 }, texture: { min: 0, max: 255 } },
    { prop_id: 7, drawable: { min: -1, max: 255 }, texture: { min: 0, max: 255 } },
  ],
  headBlend: {
    shapeFirst: {
      min: 0,
      max: 45,
    },
    shapeSecond: {
      min: 0,
      max: 45,
    },
    skinFirst: {
      min: 0,
      max: 45,
    },
    skinSecond: {
      min: 0,
      max: 45,
    },
    shapeMix: {
      min: 0,
      max: 10,
      factor: 0.1,
    },
    skinMix: {
      min: 0,
      max: 10,
      factor: 0.1,
    },
  },
  faceFeatures: {
    noseWidth: {
      min: -10,
      max: 10,
      factor: 0.1,
    },
    nosePeakHigh: {
      min: -10,
      max: 10,
      factor: 0.1,
    },
    nosePeakSize: {
      min: -10,
      max: 10,
      factor: 0.1,
    },
    noseBoneHigh: {
      min: -10,
      max: 10,
      factor: 0.1,
    },
    nosePeakLowering: {
      min: -10,
      max: 10,
      factor: 0.1,
    },
    noseBoneTwist: {
      min: -10,
      max: 10,
      factor: 0.1,
    },
    eyeBrownHigh: {
      min: -10,
      max: 10,
      factor: 0.1,
    },
    eyeBrownForward: {
      min: -10,
      max: 10,
      factor: 0.1,
    },
    cheeksBoneHigh: {
      min: -10,
      max: 10,
      factor: 0.1,
    },
    cheeksBoneWidth: {
      min: -10,
      max: 10,
      factor: 0.1,
    },
    cheeksWidth: {
      min: -10,
      max: 10,
      factor: 0.1,
    },
    eyesOpening: {
      min: -10,
      max: 10,
      factor: 0.1,
    },
    lipsThickness: {
      min: -10,
      max: 10,
      factor: 0.1,
    },
    jawBoneWidth: {
      min: -10,
      max: 10,
      factor: 0.1,
    },
    jawBoneBackSize: {
      min: -10,
      max: 10,
      factor: 0.1,
    },
    chinBoneLowering: {
      min: -10,
      max: 10,
      factor: 0.1,
    },
    chinBoneLenght: {
      min: -10,
      max: 10,
      factor: 0.1,
    },
    chinBoneSize: {
      min: -10,
      max: 10,
      factor: 0.1,
    },
    chinHole: {
      min: -10,
      max: 10,
      factor: 0.1,
    },
    neckThickness: {
      min: -10,
      max: 10,
      factor: 0.1,
    },
  },
  headOverlays: {
    blemishes: {
      style: {
        min: 0,
        max: 23,
      },
      opacity: {
        min: 0,
        max: 10,
        factor: 0.1,
      },
    },
    beard: {
      style: {
        min: 0,
        max: 28,
      },
      opacity: {
        min: 0,
        max: 10,
        factor: 0.1,
      },
      color: {
        items: [
          [255, 0, 0],
          [0, 255, 0],
          [0, 0, 255],
        ],
      },
    },
    eyebrows: {
      style: {
        min: 0,
        max: 33,
      },
      opacity: {
        min: 0,
        max: 10,
        factor: 0.1,
      },
      color: {
        items: [
          [255, 0, 0],
          [0, 255, 0],
          [0, 0, 255],
        ],
      },
    },
    ageing: {
      style: {
        min: 0,
        max: 14,
      },
      opacity: {
        min: 0,
        max: 10,
        factor: 0.1,
      },
    },
    makeUp: {
      style: {
        min: 0,
        max: 74,
      },
      opacity: {
        min: 0,
        max: 10,
        factor: 0.1,
      },
      color: {
        items: [
          [255, 0, 0],
          [0, 255, 0],
          [0, 0, 255],
        ],
      },
    },
    blush: {
      style: {
        min: 0,
        max: 6,
      },
      opacity: {
        min: 0,
        max: 10,
        factor: 0.1,
      },
      color: {
        items: [
          [255, 0, 0],
          [0, 255, 0],
          [0, 0, 255],
        ],
      },
    },
    complexion: {
      style: {
        min: 0,
        max: 11,
      },
      opacity: {
        min: 0,
        max: 10,
        factor: 0.1,
      },
    },
    sunDamage: {
      style: {
        min: 0,
        max: 10,
      },
      opacity: {
        min: 0,
        max: 10,
        factor: 0.1,
      },
    },
    lipstick: {
      style: {
        min: 0,
        max: 9,
      },
      opacity: {
        min: 0,
        max: 10,
        factor: 0.1,
      },
      color: {
        items: [
          [255, 0, 0],
          [0, 255, 0],
          [0, 0, 255],
        ],
      },
    },
    moleAndFreckles: {
      style: {
        min: 0,
        max: 17,
      },
      opacity: {
        min: 0,
        max: 10,
        factor: 0.1,
      },
    },
    chestHair: {
      style: {
        min: 0,
        max: 16,
      },
      opacity: {
        min: 0,
        max: 10,
        factor: 0.1,
      },
      color: {
        items: [
          [255, 0, 0],
          [0, 255, 0],
          [0, 0, 255],
        ],
      },
    },
    bodyBlemishes: {
      style: {
        min: 0,
        max: 11,
      },
      opacity: {
        min: 0,
        max: 10,
        factor: 0.1,
      },
    },
  },
  hair: {
    style: {
      min: 0,
      max: 255,
    },
    color: {
      items: [
        [255, 0, 0],
        [0, 255, 0],
        [0, 0, 255],
      ],
    },
    highlight: {
      items: [
        [255, 0, 0],
        [0, 255, 0],
        [0, 0, 255],
      ],
    },
  },
  eyeColor: {
    min: 0,
    max: 30,
  },
};

export const CAMERA_INITIAL_STATE = { head: false, body: false, bottom: false };

export const ROTATE_INITIAL_STATE = { left: false, right: false };
