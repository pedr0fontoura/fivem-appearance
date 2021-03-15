import { DEFAULT_APPEARANCE, DEFAULT_SETTINGS } from '../../constants';
import { setPlayerAppearance } from '../../index';
import { getPedHeadBlendData } from './ped';

import { arrayToVector3 } from '../../utils/vector';

import { registerNuiCallbacks } from './nui';

declare function OpenSequenceTask(id: number): [any, number];

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

const pedModels: string[] = JSON.parse(LoadResourceFile(GetCurrentResourceName(), 'peds.json'));

let callback: (appearance?: PedAppearance) => void;

let playerAppearance: PedAppearance;

let playerCoords: Vector3;
export let playerHeading: number;

let cameraHandle: number;
let currentCamera: string;
let reverseCamera: boolean;

let isCameraInterpolating: boolean;

function getComponent(components: PedComponent[], component_id: number) {
  let component = components.find(c => c.component_id === component_id);

  if (!component) {
    [component] = components;
  }
  return component;
}

function getProp(props: PedProp[], prop_id: number) {
  let prop = props.find(p => p.prop_id === prop_id);

  if (!prop) {
    [prop] = props;
  }
  return prop;
}

function getRgbColors(): { hair: number[][]; makeUp: number[][] } {
  const colors = {
    hair: [],
    makeUp: [],
  };

  for (let i = 0; i <= 63; i++) {
    colors.hair.push(GetPedHairRgbColor(i));
    colors.makeUp.push(GetMakeupRgbColor(i));
  }

  return colors;
}

export function getComponentSettings(component: PedComponent): ComponentSettings {
  const playerPed = PlayerPedId();

  const settings = {
    component_id: component.component_id,
    drawable: {
      min: 0,
      max: GetNumberOfPedDrawableVariations(playerPed, component.component_id),
    },
    texture: {
      min: 0,
      max: GetNumberOfPedTextureVariations(playerPed, component.component_id, component.drawable),
    },
  };

  return settings;
}

export function getComponentsSettings(components: PedComponent[]): ComponentSettings[] {
  const playerPed = PlayerPedId();

  const settings = DEFAULT_SETTINGS.components;

  settings.forEach(componentSettings => {
    const component = getComponent(components, componentSettings.component_id);

    componentSettings.drawable.max = GetNumberOfPedDrawableVariations(
      playerPed,
      componentSettings.component_id,
    );

    componentSettings.texture.max = GetNumberOfPedTextureVariations(
      playerPed,
      component.component_id,
      component.drawable,
    );
  });

  return settings;
}

export function getPropSettings(prop: PedProp): PropSettings {
  const playerPed = PlayerPedId();

  const settings = {
    prop_id: prop.prop_id,
    drawable: {
      min: -1,
      max: GetNumberOfPedPropDrawableVariations(playerPed, prop.prop_id),
    },
    texture: {
      min: -1,
      max: GetNumberOfPedPropTextureVariations(playerPed, prop.prop_id, prop.drawable),
    },
  };

  return settings;
}

export function getPropsSettings(props: PedProp[]): PropSettings[] {
  const playerPed = PlayerPedId();

  const settings = DEFAULT_SETTINGS.props;

  settings.forEach(propSettings => {
    const prop = getProp(props, propSettings.prop_id);

    propSettings.drawable.max = GetNumberOfPedPropDrawableVariations(
      playerPed,
      propSettings.prop_id,
    );

    propSettings.texture.max = GetNumberOfPedPropTextureVariations(
      playerPed,
      propSettings.prop_id,
      prop.drawable,
    );
  });

  return settings;
}

export function getPlayerPedAppearance(model?: string): PedAppearance {
  const playerPed = PlayerPedId();

  const playerPedAppearance = { ...DEFAULT_APPEARANCE };

  if (model) {
    playerPedAppearance.model = model;
  }

  playerPedAppearance.headBlend = getPedHeadBlendData(playerPed);

  playerPedAppearance.components.forEach(component => {
    component.drawable = GetPedDrawableVariation(playerPed, component.component_id);
    component.texture = GetPedTextureVariation(playerPed, component.component_id);
  });

  playerPedAppearance.props.forEach(prop => {
    prop.drawable = GetPedPropIndex(playerPed, prop.prop_id);
    prop.texture = GetPedPropTextureIndex(playerPed, prop.prop_id);
  });

  playerPedAppearance.hair = {
    style: GetPedDrawableVariation(playerPed, 2),
    color: GetPedHairColor(playerPed),
    highlight: GetPedHairHighlightColor(playerPed),
  };

  return playerPedAppearance;
}

export function getAppearance(): PedAppearance {
  if (!playerAppearance) {
    playerAppearance = getPlayerPedAppearance();
  }

  return playerAppearance;
}

export function getAppearanceSettings(appearanceData: PedAppearance): AppearanceSettings {
  const pedSettings = DEFAULT_SETTINGS.ped;

  pedSettings.model.items = pedModels;

  const componentsSettings = getComponentsSettings(appearanceData.components);

  const propsSettings = getPropsSettings(appearanceData.props);

  const headBlendSettings = DEFAULT_SETTINGS.headBlend;

  const faceFeaturesSettings = DEFAULT_SETTINGS.faceFeatures;

  const { hair: hairColors, makeUp: makeUpColors } = getRgbColors();

  const headOverlaysSettings = DEFAULT_SETTINGS.headOverlays;

  Object.keys(headOverlaysSettings).forEach((key: HeadOverlaysSettingsKey) => {
    if (headOverlaysSettings[key].color) {
      const colorMap = {
        beard: hairColors,
        eyebrows: hairColors,
        chestHair: hairColors,
        makeUp: makeUpColors,
        blush: makeUpColors,
        lipstick: makeUpColors,
      };

      headOverlaysSettings[key].color.items = colorMap[key];
    }
  });

  const hairSettings = DEFAULT_SETTINGS.hair;

  hairSettings.style.max = GetNumberOfPedDrawableVariations(PlayerPedId(), 2);

  hairSettings.color.items = hairColors;
  hairSettings.highlight.items = hairColors;

  const eyeColorSettings = DEFAULT_SETTINGS.eyeColor;

  const appearanceSettings = {
    ped: pedSettings,
    components: componentsSettings,
    props: propsSettings,
    headBlend: headBlendSettings,
    faceFeatures: faceFeaturesSettings,
    headOverlays: headOverlaysSettings,
    hair: hairSettings,
    eyeColor: eyeColorSettings,
  };

  return appearanceSettings;
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

  const [, sequence] = OpenSequenceTask(0);
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
  CloseSequenceTask(sequence);

  ClearPedTasks(ped);
  TaskPerformSequence(ped, sequence);
  ClearSequenceTask(sequence);
}

function startPlayerCustomization(cb: (appearance?: PedAppearance) => void): void;
function startPlayerCustomization(
  appearance: PedAppearance,
  cb: (appearance?: PedAppearance) => void,
): void;

function startPlayerCustomization(
  paramOne: PedAppearance | ((appearance?: PedAppearance) => void),
  paramTwo?: (appearance?: PedAppearance) => void,
): void {
  let appearance;
  let cb;

  if (paramTwo) {
    appearance = paramOne;
    cb = paramTwo;
  } else {
    cb = paramOne;
  }

  if (appearance) {
    playerAppearance = appearance;
  }

  callback = cb;

  const playerPed = PlayerPedId();

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
  }

  if (callback) {
    callback(appearance);
  }

  callback = null;

  playerAppearance = null;

  playerCoords = null;

  cameraHandle = null;
  currentCamera = null;
  reverseCamera = null;

  isCameraInterpolating = null;
}

export function loadModule(): void {
  registerNuiCallbacks();

  exports('startPlayerCustomization', startPlayerCustomization);
}

export default { loadModule };
