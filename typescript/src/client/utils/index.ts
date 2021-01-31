export const Delay = (ms: number): Promise<void> => new Promise(res => setTimeout(res, ms));

export const isPedFreemodeModel = (ped: number): boolean => {
  const entityModel = GetEntityModel(ped);

  const freemodeMale = GetHashKey('mp_m_freemode_01');
  const freemodeFemale = GetHashKey('mp_f_freemode_01');

  return entityModel === freemodeMale || entityModel === freemodeFemale;
};

export const getPedComponents = (ped: number): PedComponent[] => {
  const components = [];

  const componentIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  componentIds.forEach(componentId => {
    components.push({
      component_id: componentId,
      drawable: GetPedDrawableVariation(ped, componentId),
      texture: GetPedTextureVariation(ped, componentId),
    });
  });

  return components;
};

export const getPedProps = (ped: number): PedProp[] => {
  const props = [];

  const propIds = [0, 1, 2, 6, 7];

  propIds.forEach(propId => {
    props.push({
      prop_id: propId,
      drawable: GetPedPropIndex(ped, propId),
      texture: GetPedPropTextureIndex(ped, propId),
    });
  });

  return props;
};
