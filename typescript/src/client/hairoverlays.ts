/*
MIT License

Copyright (c) 2021 root-cause

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/* 
  The code in this file is basically a port of the original code made for another GTAV client to FiveM.
*/

const GET_TATTOO_COLLECTION_DATA = '0xFF56381874F82086';
const GET_NUM_TATTOO_SHOP_DLC_ITEMS = '0x278F76C3B0A8F109';
const GET_HASH_NAME_FOR_COMPONENT = '0x0368B3A838070348';
const GET_SHOP_PED_APPAREL_FORCED_COMPONENT_COUNT = '0xC6B9DB42C04DD8C3';
const GET_FORCED_COMPONENT = '0x6C93ED8C2F74859B';
const JENKINS_ZERO = GetHashKey('0') >> 0;
const HAIR_OVERLAY = GetHashKey('hairOverlay') >> 0;
const FREEMODE_MALE_MODEL = GetHashKey('mp_m_freemode_01') >> 0;
const FREEMODE_FEMALE_MODEL = GetHashKey('mp_f_freemode_01') >> 0;
const DEFAULT_COLLECTION = GetHashKey('mpbeach_overlays') >> 0;
const DEFAULT_PRESET = GetHashKey('fm_hair_fuzz') >> 0;
const MP_MALE_CHAR_TYPE = 3;
const MP_FEMALE_CHAR_TYPE = 4;
const HAIR_COMPONENT_INDEX = 2;
const DECAL_COMPONENT_INDEX = 10;

interface HairOverlay {
  collection: number;
  preset: number;
}

interface TattooCollectionData {
  lockHash: number;
  id: number;
  collection: number;
  preset: number;
  cost: number;
  eFacing: number;
  updateGroup: number;
}

const freemodeMaleOverlays = new Map<number, number>();
const freemodeFemaleOverlays = new Map<number, number>();
const hairOverlayCache = new Map<number, HairOverlay>();

// Credits to TomGrobbe (https://github.com/TomGrobbe)
function getTattooCollectionData(
  characterType: number,
  decorationIndex: number,
): TattooCollectionData {
  const structArray = new Uint32Array(new ArrayBuffer(10 * 8));

  Citizen.invokeNative(GET_TATTOO_COLLECTION_DATA, characterType, decorationIndex, structArray);

  const {
    0: lockHash,
    2: id,
    4: collection,
    6: preset,
    8: cost,
    10: eFacing,
    12: updateGroup,
  } = structArray;

  return {
    lockHash,
    id,
    collection,
    preset,
    cost,
    eFacing,
    updateGroup,
  };
}

function fillTattooMap(map: Map<number, number>, characterIndex: number): void {
  const numTattooShopDlcItems: number = Citizen.invokeNative(
    GET_NUM_TATTOO_SHOP_DLC_ITEMS,
    characterIndex,
  );
  for (let i = 0; i < numTattooShopDlcItems; i++) {
    const { preset, collection, updateGroup } = getTattooCollectionData(characterIndex, i) || {};

    if (updateGroup !== HAIR_OVERLAY) {
      continue;
    }

    map.set(preset >> 0, collection >> 0);
  }
}

export function fillTattooMaps(): void {
  fillTattooMap(freemodeMaleOverlays, MP_MALE_CHAR_TYPE);
  fillTattooMap(freemodeFemaleOverlays, MP_FEMALE_CHAR_TYPE);

  console.log(freemodeMaleOverlays);
}

function findHairOverlay(hairHash: number, characterIndex: number): HairOverlay {
  if (hairOverlayCache.has(hairHash)) {
    return hairOverlayCache.get(hairHash);
  }

  const outForcedComponent = {
    hash: new Uint32Array(new ArrayBuffer(4)),
    index: new Uint32Array(new ArrayBuffer(4)),
    type: new Uint32Array(new ArrayBuffer(4)),
  };

  const outHairOverlay = {
    collection: DEFAULT_COLLECTION,
    preset: DEFAULT_PRESET,
  };

  const shopPedApparelForcedComponentCount: number = Citizen.invokeNative(
    GET_SHOP_PED_APPAREL_FORCED_COMPONENT_COUNT,
    hairHash,
  );

  for (let i = 0; i < shopPedApparelForcedComponentCount; i++) {
    Citizen.invokeNative(
      GET_FORCED_COMPONENT,
      hairHash,
      i,
      outForcedComponent.hash,
      outForcedComponent.index,
      outForcedComponent.type,
    );

    if (
      outForcedComponent.type[0] !== DECAL_COMPONENT_INDEX ||
      outForcedComponent.hash[0] === -1 ||
      outForcedComponent.hash[0] === 0 ||
      outForcedComponent.hash[0] === JENKINS_ZERO
    ) {
      continue;
    }

    const overlay = (characterIndex === MP_MALE_CHAR_TYPE
      ? freemodeMaleOverlays
      : freemodeFemaleOverlays
    ).get(outForcedComponent.hash[0]);

    if (overlay) {
      outHairOverlay.collection = overlay;
      outHairOverlay.preset = outForcedComponent.hash[0];

      break;
    }
  }

  hairOverlayCache.set(hairHash, outHairOverlay);
  return outHairOverlay;
}

export function applyHairOverlayToPed(ped: number, hairIndex: number): void {
  if (!ped) {
    return;
  }

  const pedModel = GetEntityModel(ped);

  if (pedModel === FREEMODE_MALE_MODEL || pedModel === FREEMODE_FEMALE_MODEL) {
    const hairHash =
      (Citizen.invokeNative(
        GET_HASH_NAME_FOR_COMPONENT,
        ped,
        HAIR_COMPONENT_INDEX,
        hairIndex,
        0,
      ) as any) >> 0;
    const { collection, preset } = findHairOverlay(
      hairHash,
      pedModel === FREEMODE_MALE_MODEL ? MP_MALE_CHAR_TYPE : MP_FEMALE_CHAR_TYPE,
    );

    console.log(collection, preset);
    if (!collection || !preset) {
      return;
    }

    ClearPedDecorations(ped);
    AddPedDecorationFromHashesInCorona(ped, collection, preset);
  }
}
