import Customization, { getPedTattoos, setPedTattoos } from './modules/customization';

import {
  getPedModel,
  getPedComponents,
  getPedProps,
  getPedHeadBlend,
  getPedFaceFeatures,
  getPedHeadOverlays,
  getPedHair,
  getPedAppearance,
  setPlayerModel,
  setPedHeadBlend,
  setPedFaceFeatures,
  setPedHeadOverlays,
  setPedHair,
  setPedEyeColor,
  setPedComponent,
  setPedComponents,
  setPedProp,
  setPedProps,
  setPlayerAppearance,
  setPedAppearance,
} from './appearance';

const exp = (global as any).exports;

Customization.loadModule();

exp('getPedModel', getPedModel);
exp('getPedComponents', getPedComponents);
exp('getPedProps', getPedProps);
exp('getPedHeadBlend', getPedHeadBlend);
exp('getPedFaceFeatures', getPedFaceFeatures);
exp('getPedHeadOverlays', getPedHeadOverlays);
exp('getPedHair', getPedHair);
exp('getPedTattoos', getPedTattoos);
exp('getPedAppearance', getPedAppearance);

exp('setPlayerModel', setPlayerModel);
exp('setPedHeadBlend', setPedHeadBlend);
exp('setPedFaceFeatures', setPedFaceFeatures);
exp('setPedHeadOverlays', setPedHeadOverlays);
exp('setPedHair', setPedHair);
exp('setPedEyeColor', setPedEyeColor);
exp('setPedComponent', setPedComponent);
exp('setPedComponents', setPedComponents);
exp('setPedProp', setPedProp);
exp('setPedProps', setPedProps);
exp('setPedTattoos', setPedTattoos);
exp('setPlayerAppearance', setPlayerAppearance);
exp('setPedAppearance', setPedAppearance);
