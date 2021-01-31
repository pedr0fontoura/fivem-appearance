import { Delay } from './utils';

import { getPedHairDecal } from './misc';

import {
  DEFAULT_HEAD_BLEND,
  DEFAULT_FACE_FEATURES,
  DEFAULT_HEAD_OVERLAYS,
  DEFAULT_HAIR,
  DEFAULT_COMPONENTS,
  DEFAULT_PROPS,
} from './defaults';

async function setPlayerModel(model: string): Promise<void> {
  RequestModel(model);

  while (!HasModelLoaded(model)) {
    await Delay(0);
  }

  SetPlayerModel(PlayerId(), model);

  SetModelAsNoLongerNeeded(model);

  SetPedDefaultComponentVariation(PlayerId());

  // Emit event for async hooks since async exports are not a thing
  emit('cfx-appearance:playerModelChanged');
}

function setPedHeadBlend(ped: number, headBlend: PedHeadBlend = DEFAULT_HEAD_BLEND) {
  const { shapeFirst, shapeSecond, shapeMix, skinFirst, skinSecond, skinMix } = headBlend;

  SetPedHeadBlendData(
    ped,
    shapeFirst,
    shapeSecond,
    0,
    skinFirst,
    skinSecond,
    0,
    shapeMix,
    skinMix,
    0,
    false,
  );
}

function setPedFaceFeatures(
  ped: number,
  faceFeatures: PedFaceFeatures = DEFAULT_FACE_FEATURES,
): void {
  Object.keys(faceFeatures).forEach(faceFeature => {
    const index = FaceFeatures[faceFeature];

    const value = faceFeatures[faceFeature];

    SetPedFaceFeature(ped, index, value);
  });
}

function setPedHeadOverlays(
  ped: number,
  headOverlays: PedHeadOverlays = DEFAULT_HEAD_OVERLAYS,
): void {
  Object.keys(headOverlays).forEach(headOverlay => {
    const index: number = HeadOverlays[headOverlay];

    const overlay: PedHeadOverlayValue = headOverlays[headOverlay];

    SetPedHeadOverlay(ped, index, overlay.style, overlay.opacity);

    if (overlay.color) {
      let colorType = 1;

      if (index === HeadOverlays.blush || index === HeadOverlays.lipstick) {
        colorType = 2;
      }

      SetPedHeadOverlayColor(ped, index, colorType, overlay.color, overlay.color);
    }
  });
}

function setPedHair(ped: number, hair: PedHair = DEFAULT_HAIR): void {
  const { style, color, highlight } = hair;

  SetPedComponentVariation(ped, 2, style, 0, 0);

  SetPedHairColor(ped, color, highlight);

  const hairDecal = getPedHairDecal(ped, style);

  ClearPedDecorations(ped);

  if (hairDecal) {
    const { collection, overlay } = hairDecal;

    AddPedDecorationFromHashes(ped, GetHashKey(collection), GetHashKey(overlay));
  }
}

function setPedEyeColor(ped: number, eyeColor = 0): void {
  SetPedEyeColor(ped, eyeColor);
}

function setPedComponents(ped: number, components: PedComponent[] = DEFAULT_COMPONENTS): void {
  components.forEach(({ component_id, drawable, texture }) => {
    SetPedComponentVariation(ped, component_id, drawable, texture, 0);
  });
}

function setPedProps(ped: number, props: PedProp[] = DEFAULT_PROPS): void {
  props.forEach(({ prop_id, drawable, texture }) => {
    if (drawable === -1) {
      ClearPedProp(ped, prop_id);
    } else {
      SetPedPropIndex(ped, prop_id, drawable, texture, false);
    }
  });
}

async function setPlayerAppearance(appearance: PedAppearance): Promise<void> {
  const {
    model,
    components,
    props,
    headBlend,
    faceFeatures,
    headOverlays,
    hair,
    eyeColor,
  } = appearance;

  await setPlayerModel(model);

  const playerPed = PlayerPedId();

  setPedComponents(playerPed, components);

  setPedProps(playerPed, props);

  if (headBlend) {
    setPedHeadBlend(playerPed, headBlend);
  }

  if (faceFeatures) {
    setPedFaceFeatures(playerPed, faceFeatures);
  }

  if (headOverlays) {
    setPedHeadOverlays(playerPed, headOverlays);
  }

  if (hair) {
    setPedHair(playerPed, hair);
  }

  if (eyeColor) {
    setPedEyeColor(playerPed, eyeColor);
  }

  // Emit event for async hooks since async exports are not a thing
  emit('cfx-appearance:playerAppearanceChanged');
}

function setPedAppearance(ped: number, appearance: PedAppearance): void {
  const { components, props, headBlend, faceFeatures, headOverlays, hair, eyeColor } = appearance;

  const playerPed = PlayerPedId();

  setPedComponents(playerPed, components);

  setPedProps(playerPed, props);

  if (headBlend) {
    setPedHeadBlend(playerPed, headBlend);
  }

  if (faceFeatures) {
    setPedFaceFeatures(playerPed, faceFeatures);
  }

  if (headOverlays) {
    setPedHeadOverlays(playerPed, headOverlays);
  }

  if (hair) {
    setPedHair(playerPed, hair);
  }

  if (eyeColor) {
    setPedEyeColor(playerPed, eyeColor);
  }
}

function init(): void {
  global.Delay = Delay;

  exports('setPlayerAppearance', setPlayerAppearance);
  exports('setPedAppearance', setPedAppearance);
}

init();
