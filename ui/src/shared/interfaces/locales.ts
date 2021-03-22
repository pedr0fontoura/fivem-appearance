export default interface Locales {
  modal: {
    save: {
      title: string;
      description: string;
    };
    exit: {
      title: string;
      description: string;
    };
    accept: string;
    decline: string;
  };
  ped: {
    title: string;
    model: string;
  };
  headBlend: {
    title: string;
    shape: {
      title: string;
      firstOption: string;
      secondOption: string;
      mix: string;
    };
    skin: {
      title: string;
      firstOption: string;
      secondOption: string;
      mix: string;
    };
  };
  faceFeatures: {
    title: string;
    nose: {
      title: string;
      width: string;
      height: string;
      size: string;
      boneHeight: string;
      boneTwist: string;
      peakHeight: string;
    };
    eyebrows: {
      title: string;
      height: string;
      depth: string;
    };
    cheeks: {
      title: string;
      boneHeight: string;
      boneWidth: string;
      width: string;
    };
    eyesAndMouth: {
      title: string;
      eyesOpening: string;
      lipsThickness: string;
    };
    jaw: {
      title: string;
      width: string;
      size: string;
    };
    chin: {
      title: string;
      lowering: string;
      length: string;
      size: string;
      hole: string;
    };
    neck: {
      title: string;
      thickness: string;
    };
  };
  headOverlays: {
    title: string;
    hair: {
      title: string;
      style: string;
      color: string;
      highlight: string;
    };
    opacity: string;
    style: string;
    color: string;
    blemishes: string;
    beard: string;
    eyebrows: string;
    ageing: string;
    makeUp: string;
    blush: string;
    complexion: string;
    sunDamage: string;
    lipstick: string;
    moleAndFreckles: string;
    chestHair: string;
    bodyBlemishes: string;
    eyeColor: string;
  };
  components: {
    title: string;
    drawable: string;
    texture: string;
    mask: string;
    upperBody: string;
    lowerBody: string;
    bags: string;
    shoes: string;
    scarfAndChains: string;
    shirt: string;
    bodyArmor: string;
    decals: string;
    jackets: string;
  };
  props: {
    title: string;
    drawable: string;
    texture: string;
    hats: string;
    glasses: string;
    ear: string;
    watches: string;
    bracelets: string;
  };
}
