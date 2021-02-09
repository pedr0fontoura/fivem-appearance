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

export const DEFAULT_SETTINGS: AppearanceSettings = {
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

export const FACE_FEATURES = [
  'noseWidth',
  'nosePeakHigh',
  'nosePeakSize',
  'noseBoneHigh',
  'nosePeakLowering',
  'noseBoneTwist',
  'eyeBrownHigh',
  'eyeBrownForward',
  'cheeksBoneHigh',
  'cheeksBoneWidth',
  'cheeksWidth',
  'eyesOpening',
  'lipsThickness',
  'jawBoneWidth',
  'jawBoneBackSize',
  'chinBoneLowering',
  'chinBoneLenght',
  'chinBoneSize',
  'chinHole',
  'neckThickness',
];

export const HEAD_OVERLAYS = [
  'blemishes',
  'beard',
  'eyebrows',
  'ageing',
  'makeUp',
  'blush',
  'complexion',
  'sunDamage',
  'lipstick',
  'moleAndFreckles',
  'chestHair',
  'bodyBlemishes',
];

// Thanks to rootcause for the eye colors original names
export const EYE_COLORS: string[] = [
  'Verde',
  'Esmeralda',
  'Azul Claro',
  'Azul Oceano',
  'Marrom Claro',
  'Marrom Escuro',
  'Avelã',
  'Cinza Escuro',
  'Cinza Claro',
  'Rosa',
  'Amarelo',
  'Roxo',
  'Apagão',
  'Tons de Cinza',
  'Tequila Sunrise',
  'Atomic',
  'Warp',
  'ECola',
  'Space Ranger',
  'Ying Yang',
  'Bullseye',
  'Lagarto',
  'Dragão',
  'Extra Terrestre',
  'Goat',
  'Smiley',
  'Possuído',
  'Demônio',
  'Infectado',
  'Alien',
  'Morto-vivo',
  'Zumbi',
];

// Thanks to rootcause for the hair decals hashes
export const HAIR_DECALS: HairDecals = {
  male: [
    { id: 0, collection: 'mpbeach_overlays', overlay: 'FM_Hair_Fuzz' },
    { id: 1, collection: 'multiplayer_overlays', overlay: 'NG_M_Hair_001' },
    { id: 2, collection: 'multiplayer_overlays', overlay: 'NG_M_Hair_002' },
    { id: 3, collection: 'multiplayer_overlays', overlay: 'NG_M_Hair_003' },
    { id: 4, collection: 'multiplayer_overlays', overlay: 'NG_M_Hair_004' },
    { id: 5, collection: 'multiplayer_overlays', overlay: 'NG_M_Hair_005' },
    { id: 6, collection: 'multiplayer_overlays', overlay: 'NG_M_Hair_006' },
    { id: 7, collection: 'multiplayer_overlays', overlay: 'NG_M_Hair_007' },
    { id: 8, collection: 'multiplayer_overlays', overlay: 'NG_M_Hair_008' },
    { id: 9, collection: 'multiplayer_overlays', overlay: 'NG_M_Hair_009' },
    { id: 10, collection: 'multiplayer_overlays', overlay: 'NG_M_Hair_013' },
    { id: 11, collection: 'multiplayer_overlays', overlay: 'NG_M_Hair_002' },
    { id: 12, collection: 'multiplayer_overlays', overlay: 'NG_M_Hair_011' },
    { id: 13, collection: 'multiplayer_overlays', overlay: 'NG_M_Hair_012' },
    { id: 14, collection: 'multiplayer_overlays', overlay: 'NG_M_Hair_014' },
    { id: 15, collection: 'multiplayer_overlays', overlay: 'NG_M_Hair_015' },
    { id: 16, collection: 'multiplayer_overlays', overlay: 'NGBea_M_Hair_000' },
    { id: 17, collection: 'multiplayer_overlays', overlay: 'NGBea_M_Hair_001' },
    { id: 18, collection: 'multiplayer_overlays', overlay: 'NGBus_M_Hair_000' },
    { id: 19, collection: 'multiplayer_overlays', overlay: 'NGBus_M_Hair_001' },
    { id: 20, collection: 'multiplayer_overlays', overlay: 'NGHip_M_Hair_000' },
    { id: 21, collection: 'multiplayer_overlays', overlay: 'NGHip_M_Hair_001' },
    { id: 22, collection: 'multiplayer_overlays', overlay: 'NGInd_M_Hair_000' },
    { id: 24, collection: 'mplowrider_overlays', overlay: 'LR_M_Hair_000' },
    { id: 25, collection: 'mplowrider_overlays', overlay: 'LR_M_Hair_001' },
    { id: 26, collection: 'mplowrider_overlays', overlay: 'LR_M_Hair_002' },
    { id: 27, collection: 'mplowrider_overlays', overlay: 'LR_M_Hair_003' },
    { id: 28, collection: 'mplowrider2_overlays', overlay: 'LR_M_Hair_004' },
    { id: 29, collection: 'mplowrider2_overlays', overlay: 'LR_M_Hair_005' },
    { id: 30, collection: 'mplowrider2_overlays', overlay: 'LR_M_Hair_006' },
    { id: 31, collection: 'mpbiker_overlays', overlay: 'MP_Biker_Hair_000_M' },
    { id: 32, collection: 'mpbiker_overlays', overlay: 'MP_Biker_Hair_001_M' },
    { id: 33, collection: 'mpbiker_overlays', overlay: 'MP_Biker_Hair_002_M' },
    { id: 34, collection: 'mpbiker_overlays', overlay: 'MP_Biker_Hair_003_M' },
    { id: 35, collection: 'mpbiker_overlays', overlay: 'MP_Biker_Hair_004_M' },
    { id: 36, collection: 'mpbiker_overlays', overlay: 'MP_Biker_Hair_005_M' },
    { id: 72, collection: 'mpgunrunning_overlays', overlay: 'MP_Gunrunning_Hair_M_000_M' },
    { id: 73, collection: 'mpgunrunning_overlays', overlay: 'MP_Gunrunning_Hair_M_001_M' },
  ],
  female: [
    { id: 0, collection: 'mpbeach_overlays', overlay: 'FM_Hair_Fuzz' },
    { id: 1, collection: 'multiplayer_overlays', overlay: 'NG_F_Hair_001' },
    { id: 2, collection: 'multiplayer_overlays', overlay: 'NG_F_Hair_002' },
    { id: 3, collection: 'multiplayer_overlays', overlay: 'NG_F_Hair_003' },
    { id: 4, collection: 'multiplayer_overlays', overlay: 'NG_F_Hair_004' },
    { id: 5, collection: 'multiplayer_overlays', overlay: 'NG_F_Hair_005' },
    { id: 6, collection: 'multiplayer_overlays', overlay: 'NG_F_Hair_006' },
    { id: 7, collection: 'multiplayer_overlays', overlay: 'NG_F_Hair_007' },
    { id: 8, collection: 'multiplayer_overlays', overlay: 'NG_F_Hair_008' },
    { id: 9, collection: 'multiplayer_overlays', overlay: 'NG_F_Hair_009' },
    { id: 10, collection: 'multiplayer_overlays', overlay: 'NG_F_Hair_010' },
    { id: 11, collection: 'multiplayer_overlays', overlay: 'NG_F_Hair_011' },
    { id: 12, collection: 'multiplayer_overlays', overlay: 'NG_F_Hair_012' },
    { id: 13, collection: 'multiplayer_overlays', overlay: 'NG_F_Hair_013' },
    { id: 14, collection: 'multiplayer_overlays', overlay: 'NG_M_Hair_014' },
    { id: 15, collection: 'multiplayer_overlays', overlay: 'NG_M_Hair_015' },
    { id: 16, collection: 'multiplayer_overlays', overlay: 'NGBea_F_Hair_000' },
    { id: 17, collection: 'multiplayer_overlays', overlay: 'NGBea_F_Hair_001' },
    { id: 18, collection: 'multiplayer_overlays', overlay: 'NG_F_Hair_007' },
    { id: 19, collection: 'multiplayer_overlays', overlay: 'NGBus_F_Hair_000' },
    { id: 20, collection: 'multiplayer_overlays', overlay: 'NGBus_F_Hair_001' },
    { id: 21, collection: 'multiplayer_overlays', overlay: 'NGBea_F_Hair_001' },
    { id: 22, collection: 'multiplayer_overlays', overlay: 'NGHip_F_Hair_000' },
    { id: 23, collection: 'multiplayer_overlays', overlay: 'NGInd_F_Hair_000' },
    { id: 25, collection: 'mplowrider_overlays', overlay: 'LR_F_Hair_000' },
    { id: 26, collection: 'mplowrider_overlays', overlay: 'LR_F_Hair_001' },
    { id: 27, collection: 'mplowrider_overlays', overlay: 'LR_F_Hair_002' },
    { id: 28, collection: 'mplowrider2_overlays', overlay: 'LR_F_Hair_003' },
    { id: 29, collection: 'mplowrider2_overlays', overlay: 'LR_F_Hair_003' },
    { id: 30, collection: 'mplowrider2_overlays', overlay: 'LR_F_Hair_004' },
    { id: 31, collection: 'mplowrider2_overlays', overlay: 'LR_F_Hair_006' },
    { id: 32, collection: 'mpbiker_overlays', overlay: 'MP_Biker_Hair_000_F' },
    { id: 33, collection: 'mpbiker_overlays', overlay: 'MP_Biker_Hair_001_F' },
    { id: 34, collection: 'mpbiker_overlays', overlay: 'MP_Biker_Hair_002_F' },
    { id: 35, collection: 'mpbiker_overlays', overlay: 'MP_Biker_Hair_003_F' },
    { id: 36, collection: 'multiplayer_overlays', overlay: 'NG_F_Hair_003' },
    { id: 37, collection: 'mpbiker_overlays', overlay: 'MP_Biker_Hair_006_F' },
    { id: 38, collection: 'mpbiker_overlays', overlay: 'MP_Biker_Hair_004_F' },
    { id: 76, collection: 'mpgunrunning_overlays', overlay: 'MP_Gunrunning_Hair_F_000_F' },
    { id: 77, collection: 'mpgunrunning_overlays', overlay: 'MP_Gunrunning_Hair_F_001_F' },
  ],
};

export const PED_MODELS: string[] = ['mp_m_freemode_01', 'mp_f_freemode_01', 'player_zero'];
