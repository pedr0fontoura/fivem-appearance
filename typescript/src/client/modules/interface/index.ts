import { DEFAULT_APPEARANCE, DEFAULT_SETTINGS } from '../../constants';
import { PED_MODELS } from '../../constants';

import { registerNuiCallbacks } from './events';

let playerAppearance: PedAppearance;

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

export function getComponentsSettings(components: PedComponent[]): ComponentSettings[] {
  const playerPed = PlayerPedId();

  const settings = DEFAULT_SETTINGS.components;

  settings.forEach(componentSettings => {
    const component = getComponent(components, componentSettings.component_id);

    componentSettings.drawable.max = GetNumberOfPedDrawableVariations(
      playerPed,
      componentSettings.component_id,
    );

    console.log(componentSettings.component_id, componentSettings.drawable.max);

    componentSettings.texture.max = GetNumberOfPedTextureVariations(
      playerPed,
      component.component_id,
      component.drawable,
    );
  });

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

export function getAppearance(): PedAppearance {
  return playerAppearance ? playerAppearance : DEFAULT_APPEARANCE;
}

export function getAppearanceSettings(appearanceData: PedAppearance): AppearanceSettings {
  const pedSettings = DEFAULT_SETTINGS.ped;

  pedSettings.model.items = PED_MODELS;

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

export function loadModule(): void {
  registerNuiCallbacks();
}
