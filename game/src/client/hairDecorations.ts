import { isPedFreemodeModel, isHardcodedHairDecoration, MP_FREEMODE_MALE } from './utils';

import { HARDCODED_MALE_HAIR_DECORATIONS, HARDCODED_FEMALE_HAIR_DECORATIONS } from './constants';

const GET_TATTOO_SHOP_DLC_ITEM_DATA = '0xFF56381874F82086';

const JENKINS_ZERO = GetHashKey('0');
const HAIR_OVERLAY = GetHashKey('hairOverlay');

const DEFAULT_COLLECTION = GetHashKey('mpbeach_overlays');
const DEFAULT_OVERLAY = GetHashKey('fm_hair_fuzz');

const MP_MALE_CHAR_TYPE = 3;
const MP_FEMALE_CHAR_TYPE = 4;

const HAIR_COMPONENT_INDEX = 2;
const DECAL_COMPONENT_INDEX = 10;

const freemodeMaleDecorations = new Map<number, number>();
const freemodeFemaleDecorations = new Map<number, number>();

const hairDecorationsCache = new Map<number, HairDecoration>();

function getTattoCollectionData(
  characterType: number,
  decorationIndex: number,
): TattoCollectionData {
  const buffer = new ArrayBuffer(10 * 8);

  global.Citizen.invokeNative(
    GET_TATTOO_SHOP_DLC_ITEM_DATA,
    characterType,
    decorationIndex,
    new Uint32Array(buffer),
  );

  const {
    0: lockHash,
    2: id,
    4: collection,
    6: overlay,
    8: cost,
    10: eFacing,
    12: updateGroup,
  } = new Uint32Array(buffer);

  return {
    lockHash,
    id,
    collection,
    overlay,
    cost,
    eFacing,
    updateGroup,
  };
}

function fillDecorationsMap(map: Map<number, number>, characterType: number): void {
  const numTattooShopDlcItems = GetNumTattooShopDlcItems(characterType);

  for (let i = 0; i < numTattooShopDlcItems; i++) {
    const { collection, overlay, updateGroup } = getTattoCollectionData(characterType, i) || {};

    if (updateGroup !== HAIR_OVERLAY) {
      continue;
    }

    map.set(overlay, collection);
  }
}

export function fillDecorationsMaps(): void {
  fillDecorationsMap(freemodeMaleDecorations, MP_MALE_CHAR_TYPE);
  fillDecorationsMap(freemodeFemaleDecorations, MP_FEMALE_CHAR_TYPE);
}

function findHairDecoration(hairHash: number, characterType: number): HairDecoration {
  if (hairDecorationsCache.has(hairHash)) {
    return hairDecorationsCache.get(hairHash);
  }

  let hairDecoration: HairDecoration;

  const shopPedApparelForcedComponentCount = GetShopPedApparelForcedComponentCount(hairHash);

  for (let i = 0; i < shopPedApparelForcedComponentCount; i++) {
    const [forcedComponentHash, forcedComponentType] = GetForcedComponent(hairHash, i);

    if (
      forcedComponentType !== DECAL_COMPONENT_INDEX ||
      forcedComponentHash === -1 ||
      forcedComponentHash === 0 ||
      forcedComponentHash === JENKINS_ZERO
    ) {
      continue;
    }

    const decoration = (
      characterType === MP_MALE_CHAR_TYPE ? freemodeMaleDecorations : freemodeFemaleDecorations
    ).get(forcedComponentHash);

    if (decoration) {
      hairDecoration = { collection: decoration, overlay: forcedComponentHash };
      break;
    }
  }

  hairDecorationsCache.set(hairHash, hairDecoration);

  return hairDecoration;
}

export function setPedHairDecoration(ped: number, hairIndex: number): void {
  if (!ped) return;

  const pedModel = GetEntityModel(ped);

  if (isPedFreemodeModel(pedModel)) {
    const hairHash = GetHashNameForComponent(ped, HAIR_COMPONENT_INDEX, hairIndex, 0);

    const isMaleFreemodePed = pedModel === MP_FREEMODE_MALE;

    let hairDecoration: HairDecoration | HardcodedHairDecoration = findHairDecoration(
      hairHash,
      isMaleFreemodePed ? MP_MALE_CHAR_TYPE : MP_FEMALE_CHAR_TYPE,
    );

    if (!hairDecoration) {
      const hardcodedDecorations = isMaleFreemodePed
        ? HARDCODED_MALE_HAIR_DECORATIONS
        : HARDCODED_FEMALE_HAIR_DECORATIONS;

      if (hardcodedDecorations.has(hairIndex)) {
        hairDecoration = hardcodedDecorations.get(hairIndex);
      }
    }

    ClearPedDecorations(ped);

    if (hairDecoration) {
      if (isHardcodedHairDecoration(hairDecoration)) {
        AddPedDecorationFromHashes(
          ped,
          GetHashKey(hairDecoration.collection),
          GetHashKey(hairDecoration.overlay),
        );
      } else {
        AddPedDecorationFromHashes(ped, hairDecoration.collection, hairDecoration.overlay);
      }
    }
  }
}
