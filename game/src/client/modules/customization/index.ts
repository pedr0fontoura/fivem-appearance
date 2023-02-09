import {
  PED_COMPONENTS_IDS,
  PED_PROPS_IDS,
  FACE_FEATURES,
  HEAD_OVERLAYS,
  DEFAULT_CUSTOMIZATION_CONFIG,
  DATA_CLOTHES,
} from '../../constants';

import { pedModels, getPedAppearance, setPlayerAppearance, totalTattoos } from '../../appearance';

import { arrayToVector3, isPedMale, Delay } from '../../utils';

import { registerNuiCallbacks } from './nui';

// Override native typing
declare function OpenSequenceTask(): number;

const exp = (global as any).exports;

const CAMERAS = {
  default: {
    coords: { x: 0, y: 2.2, z: 0.2 },
    point: { x: 0, y: 0, z: -0.05 },
  },
  head: {
    coords: { x: 0, y: 0.9, z: 0.65 },
    point: { x: 0, y: 0, z: 0.6 },
  },
  body: {
    coords: { x: 0, y: 1.2, z: 0.2 },
    point: { x: 0, y: 0, z: 0.2 },
  },
  bottom: {
    coords: { x: 0, y: 0.98, z: -0.7 },
    point: { x: 0, y: 0, z: -0.9 },
  },
};

const OFFSETS = {
  default: { x: 1.5, y: -1 },
  head: { x: 0.7, y: -0.45 },
  body: { x: 1.2, y: -0.45 },
  bottom: { x: 0.7, y: -0.45 },
};

let callback: (appearance?: PedAppearance) => void;
let config: CustomizationConfig;

let playerAppearance: PedAppearance;

let playerCoords: Vector3;
export let playerHeading: number;

let cameraHandle: number;
let currentCamera: string;
let reverseCamera: boolean;

let isCameraInterpolating: boolean;

let PED_TATTOOS: TattooList = {};

function getRgbColors(): { hair: number[][]; makeUp: number[][] } {
  const colors = {
    hair: [],
    makeUp: [],
  };

  for (let i = 0; i < GetNumHairColors(); i++) {
    colors.hair.push(GetPedHairRgbColor(i));
  }

  for (let i = 0; i < GetNumMakeupColors(); i++) {
    colors.makeUp.push(GetMakeupRgbColor(i));
  }

  return colors;
}

export function getAppearance(): PedAppearance {
  if (!playerAppearance) {
    playerAppearance = getPedAppearance(PlayerPedId());
  }

  return playerAppearance;
}

export function getComponentSettings(ped: number, componentId: number): ComponentSettings {
  const drawableId = GetPedDrawableVariation(ped, componentId);

  const settings = {
    component_id: componentId,
    drawable: {
      min: 0,
      max: GetNumberOfPedDrawableVariations(ped, componentId) - 1,
    },
    texture: {
      min: 0,
      max: GetNumberOfPedTextureVariations(ped, componentId, drawableId) - 1,
    },
  };

  return settings;
}

export function getPropSettings(ped: number, propId: number): PropSettings {
  const drawableId = GetPedPropIndex(ped, propId);

  const settings = {
    prop_id: propId,
    drawable: {
      min: -1,
      max: GetNumberOfPedPropDrawableVariations(ped, propId) - 1,
    },
    texture: {
      min: -1,
      max: GetNumberOfPedPropTextureVariations(ped, propId, drawableId) - 1,
    },
  };

  return settings;
}

export function getAppearanceSettings(): AppearanceSettings {
  const playerPed = PlayerPedId();

  const ped: PedSettings = {
    model: {
      items: pedModels,
    },
  };

  const tattoos: TattoosSettings = {
    items: totalTattoos,
  };

  const components: ComponentSettings[] = PED_COMPONENTS_IDS.map(componentId =>
    getComponentSettings(playerPed, componentId),
  );

  const props: PropSettings[] = PED_PROPS_IDS.map(propId => getPropSettings(playerPed, propId));

  const headBlend: HeadBlendSettings = {
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
      max: 1,
      factor: 0.1,
    },
    skinMix: {
      min: 0,
      max: 1,
      factor: 0.1,
    },
  };

  const faceFeatures: FaceFeaturesSettings = FACE_FEATURES.reduce((object, faceFeature) => {
    return { ...object, [faceFeature]: { min: -1, max: 1, factor: 0.1 } };
  }, {} as FaceFeaturesSettings);

  const colors = getRgbColors();

  const colorMap = {
    beard: colors.hair,
    eyebrows: colors.hair,
    chestHair: colors.hair,
    makeUp: colors.makeUp,
    blush: colors.makeUp,
    lipstick: colors.makeUp,
  };

  const headOverlays: HeadOverlaysSettings = HEAD_OVERLAYS.reduce((object, headOverlay, index) => {
    const settings = {
      style: {
        min: 0,
        max: GetPedHeadOverlayNum(index) - 1,
      },
      opacity: {
        min: 0,
        max: 1,
        factor: 0.1,
      },
    };

    if (colorMap[headOverlay]) {
      Object.assign(settings, {
        color: {
          items: colorMap[headOverlay],
        },
      });
    }

    return { ...object, [headOverlay]: settings };
  }, {} as HeadOverlaysSettings);

  const hair: HairSettings = {
    style: {
      min: 0,
      max: GetNumberOfPedDrawableVariations(playerPed, 2) - 1,
    },
    color: {
      items: colors.hair,
    },
    highlight: {
      items: colors.hair,
    },
  };

  const eyeColor: EyeColorSettings = {
    min: 0,
    max: 30,
  };

  return {
    ped,
    components,
    props,
    headBlend,
    faceFeatures,
    headOverlays,
    hair,
    eyeColor,
    tattoos,
  };
}

export function getConfig(): CustomizationConfig {
  return config;
}

export function setCamera(key: string): void {
  if (isCameraInterpolating) {
    return;
  }

  if (key !== 'current') {
    currentCamera = key;
  }

  const { coords, point } = CAMERAS[currentCamera];

  const reverseFactor = reverseCamera ? -1 : 1;

  if (cameraHandle) {
    const camCoords = arrayToVector3(
      GetOffsetFromEntityInWorldCoords(
        PlayerPedId(),
        coords.x * reverseFactor,
        coords.y * reverseFactor,
        coords.z,
      ),
    );

    const camPoint = arrayToVector3(
      GetOffsetFromEntityInWorldCoords(PlayerPedId(), point.x, point.y, point.z),
    );

    const tmpCamera = CreateCameraWithParams(
      'DEFAULT_SCRIPTED_CAMERA',
      camCoords.x,
      camCoords.y,
      camCoords.z,
      0.0,
      0.0,
      0.0,
      50.0,
      false,
      0,
    );
    PointCamAtCoord(tmpCamera, camPoint.x, camPoint.y, camPoint.z);
    SetCamActiveWithInterp(tmpCamera, cameraHandle, 1000, 1, 1);

    isCameraInterpolating = true;

    const updateCameraInterval = setInterval(() => {
      if (!IsCamInterpolating(cameraHandle) && IsCamActive(tmpCamera)) {
        DestroyCam(cameraHandle, false);
        cameraHandle = tmpCamera;
        isCameraInterpolating = false;
        clearInterval(updateCameraInterval);
      }
    }, 500);
  } else {
    const camCoords = arrayToVector3(
      GetOffsetFromEntityInWorldCoords(PlayerPedId(), coords.x, coords.y, coords.z),
    );

    const camPoint = arrayToVector3(
      GetOffsetFromEntityInWorldCoords(PlayerPedId(), point.x, point.y, point.z),
    );

    cameraHandle = CreateCameraWithParams(
      'DEFAULT_SCRIPTED_CAMERA',
      camCoords.x,
      camCoords.y,
      camCoords.z,
      0.0,
      0.0,
      0.0,
      50.0,
      false,
      0,
    );
    PointCamAtCoord(cameraHandle, camPoint.x, camPoint.y, camPoint.z);
    SetCamActive(cameraHandle, true);
  }
}

export async function rotateCamera(direction: 'left' | 'right'): Promise<void> {
  if (isCameraInterpolating) {
    return;
  }

  const { coords, point } = CAMERAS[currentCamera];
  const offset = OFFSETS[currentCamera];

  let sideFactor: number;

  const reverseFactor = reverseCamera ? -1 : 1;

  if (direction === 'left') {
    sideFactor = 1;
  } else if (direction === 'right') {
    sideFactor = -1;
  }

  const camCoords = arrayToVector3(
    GetOffsetFromEntityInWorldCoords(
      PlayerPedId(),
      (coords.x + offset.x) * sideFactor * reverseFactor,
      (coords.y + offset.y) * reverseFactor,
      coords.z,
    ),
  );

  const camPoint = arrayToVector3(
    GetOffsetFromEntityInWorldCoords(PlayerPedId(), point.x, point.y, point.z),
  );

  const tmpCamera = CreateCameraWithParams(
    'DEFAULT_SCRIPTED_CAMERA',
    camCoords.x,
    camCoords.y,
    camCoords.z,
    0.0,
    0.0,
    0.0,
    50.0,
    false,
    0,
  );

  PointCamAtCoord(tmpCamera, camPoint.x, camPoint.y, camPoint.z);

  SetCamActiveWithInterp(tmpCamera, cameraHandle, 1000, 1, 1);

  isCameraInterpolating = true;

  const updateCameraInterval = setInterval(() => {
    if (!IsCamInterpolating(cameraHandle) && IsCamActive(tmpCamera)) {
      DestroyCam(cameraHandle, false);
      cameraHandle = tmpCamera;
      isCameraInterpolating = false;
      clearInterval(updateCameraInterval);
    }
  }, 500);
}

export function pedTurnAround(ped: number): void {
  reverseCamera = !reverseCamera;

  const sequenceTaskId = OpenSequenceTask() ?? 0;

  if (sequenceTaskId !== 0) {
    TaskGoStraightToCoord(
      0,
      playerCoords.x,
      playerCoords.y,
      playerCoords.z,
      8.0,
      -1,
      GetEntityHeading(ped) - 180.0,
      0.1,
    );
    TaskStandStill(0, -1);

    CloseSequenceTask(sequenceTaskId);

    ClearPedTasks(ped);
    TaskPerformSequence(ped, sequenceTaskId);
    ClearSequenceTask(sequenceTaskId);
  }
}

export async function wearClothes(data: PedAppearance, typeClothes: string): Promise<void> {
  const { animations, props } = DATA_CLOTHES[typeClothes];
  const { dict, anim, move, duration } = animations.on;
  const { male, female } = props;
  const { components } = data;
  const playerPed = PlayerPedId();
  const isMale = isPedMale(playerPed);

  RequestAnimDict(dict);
  while (!HasAnimDictLoaded(dict)) {
    await Delay(0);
  }

  if (isMale) {
    for (let i = 0; i < male.length; i++) {
      const [componentId] = male[i];
      for (let j = 0; j < components.length; j++) {
        const { component_id, drawable, texture } = components[j];
        // eslint-disable-next-line prettier/prettier
        if (component_id === componentId)
          SetPedComponentVariation(playerPed, componentId, drawable, texture, 2);
      }
    }
  } else {
    for (let i = 0; i < female.length; i++) {
      const [componentId] = female[i];
      for (let j = 0; j < components.length; j++) {
        const { component_id, drawable, texture } = components[j];
        // eslint-disable-next-line prettier/prettier
        if (component_id === componentId)
          SetPedComponentVariation(playerPed, componentId, drawable, texture, 2);
      }
    }
  }

  TaskPlayAnim(playerPed, dict, anim, 3.0, 3.0, duration, move, 0, false, false, false);
}

export async function removeClothes(typeClothes: string): Promise<void> {
  const { animations, props } = DATA_CLOTHES[typeClothes];
  const { dict, anim, move, duration } = animations.off;
  const { male, female } = props;
  const playerPed = PlayerPedId();
  const isMale = isPedMale(playerPed);

  RequestAnimDict(dict);
  while (!HasAnimDictLoaded(dict)) {
    await Delay(0);
  }

  if (isMale) {
    for (let i = 0; i < male.length; i++) {
      const [componentId, drawableId] = male[i];
      SetPedComponentVariation(playerPed, componentId, drawableId, 0, 2);
    }
  } else {
    for (let i = 0; i < female.length; i++) {
      const [componentId, drawableId] = female[i];
      SetPedComponentVariation(playerPed, componentId, drawableId, 0, 2);
    }
  }
  TaskPlayAnim(playerPed, dict, anim, 3.0, 3.0, duration, move, 0, false, false, false);
}

export const getPedTattoos = (): TattooList => {
  return PED_TATTOOS;
};

export const setPedTattoos = (ped: number, tattoos: TattooList): void => {
  PED_TATTOOS = tattoos;
  const isMale = isPedMale(ped);
  ClearPedDecorations(ped);
  for (const zone in tattoos) {
    for (let i = 0; i < tattoos[zone].length; i++) {
      const { collection, hashFemale, hashMale } = tattoos[zone][i];
      const tattooGender = isMale ? hashMale : hashFemale;
      AddPedDecorationFromHashes(ped, GetHashKey(collection), GetHashKey(tattooGender));
    }
  }
};

export const addPedTattoo = (ped: number, tattoos: TattooList): void => {
  const isMale = isPedMale(ped);
  ClearPedDecorations(ped);
  for (const zone in tattoos) {
    for (let i = 0; i < tattoos[zone].length; i++) {
      const { collection, hashFemale, hashMale } = tattoos[zone][i];
      const tattooGender = isMale ? hashMale : hashFemale;
      AddPedDecorationFromHashes(ped, GetHashKey(collection), GetHashKey(tattooGender));
    }
  }
};

export const removePedTattoo = (ped: number, tattoos: TattooList): void => {
  const isMale = isPedMale(ped);
  ClearPedDecorations(ped);
  for (const zone in tattoos) {
    for (let i = 0; i < tattoos[zone].length; i++) {
      const { collection, hashFemale, hashMale } = tattoos[zone][i];
      const tattooGender = isMale ? hashMale : hashFemale;
      AddPedDecorationFromHashes(ped, GetHashKey(collection), GetHashKey(tattooGender));
    }
  }
};

export const setPreviewTattoo = (ped: number, data: TattooList, tattoo: Tattoo): void => {
  const isMale = isPedMale(ped);
  const { collection, hashFemale, hashMale } = tattoo;
  const tattooGender = isMale ? hashMale : hashFemale;
  ClearPedDecorations(ped);
  AddPedDecorationFromHashes(ped, GetHashKey(collection), GetHashKey(tattooGender));
  for (const zone in data) {
    for (let i = 0; i < data[zone].length; i++) {
      const { name, collection, hashFemale, hashMale } = data[zone][i];
      if (tattoo.name !== name) {
        const tattooGender = isMale ? hashMale : hashFemale;
        AddPedDecorationFromHashes(ped, GetHashKey(collection), GetHashKey(tattooGender));
      }
    }
  }
};

function startPlayerCustomization(
  cb: (appearance?: PedAppearance) => void,
  _config = DEFAULT_CUSTOMIZATION_CONFIG,
): void {
  const playerPed = PlayerPedId();

  playerAppearance = getPedAppearance(playerPed);

  callback = cb;
  _config.automaticFade = Boolean(Number(GetConvar('fivem-appearance:automaticFade', '1')));
  config = _config;

  playerCoords = arrayToVector3(GetEntityCoords(playerPed, true));
  playerHeading = GetEntityHeading(playerPed);

  reverseCamera = false;
  isCameraInterpolating = false;

  setCamera('default');

  SetNuiFocus(true, true);
  SetNuiFocusKeepInput(false);
  RenderScriptCams(true, false, 0, true, true);
  DisplayRadar(false);

  SetEntityInvincible(playerPed, true);
  TaskStandStill(playerPed, -1);

  const nuiMessage = {
    type: 'appearance_display',
    payload: {},
  };

  SendNuiMessage(JSON.stringify(nuiMessage));
}

export function exitPlayerCustomization(appearance?: PedAppearance): void {
  RenderScriptCams(false, false, 0, true, true);
  DestroyCam(cameraHandle, false);
  DisplayRadar(true);
  SetNuiFocus(false, false);

  const playerPed = PlayerPedId();

  ClearPedTasksImmediately(playerPed);
  SetEntityInvincible(playerPed, false);

  const nuiMessage = {
    type: 'appearance_hide',
    payload: {},
  };

  SendNuiMessage(JSON.stringify(nuiMessage));

  if (!appearance) {
    setPlayerAppearance(getAppearance());
  } else {
    const { tattoos } = appearance;
    setPedTattoos(playerPed, tattoos);
  }

  if (callback) {
    callback(appearance);
  }

  callback = null;
  config = null;

  playerAppearance = null;

  playerCoords = null;

  cameraHandle = null;
  currentCamera = null;
  reverseCamera = null;

  isCameraInterpolating = null;
}

function onResourceStop(resource: string) {
  if (resource !== GetCurrentResourceName()) {
    return;
  }

  SetNuiFocus(false, false);
  SetNuiFocusKeepInput(false);
}

function loadModule(): void {
  registerNuiCallbacks();

  on('onResourceStop', onResourceStop);

  exp('startPlayerCustomization', startPlayerCustomization);
}

export default { loadModule };
