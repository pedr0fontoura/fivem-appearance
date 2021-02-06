import { PedFaceFeatures, FaceFeaturesSettings } from './interfaces';

import Section from './components/Section';
import Item from './components/Item';
import RangeInput from './components/RangeInput';

interface FaceFeaturesProps {
  settings: FaceFeaturesSettings;
  faceFeatures: PedFaceFeatures;
  handleFaceFeatureChange: (key: keyof PedFaceFeatures, value: number) => void;
}

const FaceFeatures: React.FC<FaceFeaturesProps> = ({ settings, faceFeatures, handleFaceFeatureChange }) => (
  <Section title="Características faciais">
    <Item title="Nariz">
      <RangeInput
        title="Largura"
        min={settings.noseWidth.min}
        max={settings.noseWidth.max}
        factor={settings.noseWidth.factor}
        defaultValue={faceFeatures.noseWidth}
        clientValue={settings.noseWidth.clientValue}
        onChange={value => handleFaceFeatureChange('noseWidth', value)}
      />
      <RangeInput
        title="Altura"
        min={settings.nosePeakHigh.min}
        max={settings.nosePeakHigh.max}
        factor={settings.nosePeakHigh.factor}
        defaultValue={faceFeatures.nosePeakHigh}
        clientValue={settings.nosePeakHigh.clientValue}
        onChange={value => handleFaceFeatureChange('nosePeakHigh', value)}
      />
      <RangeInput
        title="Tamanho"
        min={settings.nosePeakSize.min}
        max={settings.nosePeakSize.max}
        factor={settings.nosePeakSize.factor}
        defaultValue={faceFeatures.nosePeakSize}
        clientValue={settings.nosePeakSize.clientValue}
        onChange={value => handleFaceFeatureChange('nosePeakSize', value)}
      />
      <RangeInput
        title="Altura do osso"
        min={settings.noseBoneHigh.min}
        max={settings.noseBoneHigh.max}
        factor={settings.noseBoneHigh.factor}
        defaultValue={faceFeatures.noseBoneHigh}
        clientValue={settings.noseBoneHigh.clientValue}
        onChange={value => handleFaceFeatureChange('noseBoneHigh', value)}
      />
      <RangeInput
        title="Altura da ponta"
        min={settings.nosePeakLowering.min}
        max={settings.nosePeakLowering.max}
        factor={settings.nosePeakLowering.factor}
        defaultValue={faceFeatures.nosePeakLowering}
        clientValue={settings.nosePeakLowering.clientValue}
        onChange={value => handleFaceFeatureChange('nosePeakLowering', value)}
      />
      <RangeInput
        title="Deslocamento"
        min={settings.noseBoneTwist.min}
        max={settings.noseBoneTwist.max}
        factor={settings.noseBoneTwist.factor}
        defaultValue={faceFeatures.noseBoneTwist}
        clientValue={settings.noseBoneTwist.clientValue}
        onChange={value => handleFaceFeatureChange('noseBoneTwist', value)}
      />
    </Item>
    <Item title="Sobrancelha">
      <RangeInput
        title="Altura"
        min={settings.eyeBrownHigh.min}
        max={settings.eyeBrownHigh.max}
        factor={settings.eyeBrownHigh.factor}
        defaultValue={faceFeatures.eyeBrownHigh}
        clientValue={settings.eyeBrownHigh.clientValue}
        onChange={value => handleFaceFeatureChange('eyeBrownHigh', value)}
      />
      <RangeInput
        title="Profundidade"
        min={settings.eyeBrownForward.min}
        max={settings.eyeBrownForward.max}
        factor={settings.eyeBrownForward.factor}
        defaultValue={faceFeatures.eyeBrownForward}
        clientValue={settings.eyeBrownForward.clientValue}
        onChange={value => handleFaceFeatureChange('eyeBrownForward', value)}
      />
    </Item>
    <Item title="Bochecha">
      <RangeInput
        title="Altura da maçã do rosto"
        min={settings.cheeksBoneHigh.min}
        max={settings.cheeksBoneHigh.max}
        factor={settings.cheeksBoneHigh.factor}
        defaultValue={faceFeatures.cheeksBoneHigh}
        clientValue={settings.cheeksBoneHigh.clientValue}
        onChange={value => handleFaceFeatureChange('cheeksBoneHigh', value)}
      />
      <RangeInput
        title="Largura da maçã do rosto"
        min={settings.cheeksBoneWidth.min}
        max={settings.cheeksBoneWidth.max}
        factor={settings.cheeksBoneWidth.factor}
        defaultValue={faceFeatures.cheeksBoneWidth}
        clientValue={settings.cheeksBoneWidth.clientValue}
        onChange={value => handleFaceFeatureChange('cheeksBoneWidth', value)}
      />
      <RangeInput
        title="Largura"
        min={settings.cheeksWidth.min}
        max={settings.cheeksWidth.max}
        factor={settings.cheeksWidth.factor}
        defaultValue={faceFeatures.cheeksWidth}
        clientValue={settings.cheeksWidth.clientValue}
        onChange={value => handleFaceFeatureChange('cheeksWidth', value)}
      />
    </Item>
    <Item title="Olhos e boca">
      <RangeInput
        title="Abertura dos olhos"
        min={settings.eyesOpening.min}
        max={settings.eyesOpening.max}
        factor={settings.eyesOpening.factor}
        defaultValue={faceFeatures.eyesOpening}
        clientValue={settings.eyesOpening.clientValue}
        onChange={value => handleFaceFeatureChange('eyesOpening', value)}
      />
      <RangeInput
        title="Espessura dos lábios"
        min={settings.lipsThickness.min}
        max={settings.lipsThickness.max}
        factor={settings.lipsThickness.factor}
        defaultValue={faceFeatures.lipsThickness}
        clientValue={settings.lipsThickness.clientValue}
        onChange={value => handleFaceFeatureChange('lipsThickness', value)}
      />
    </Item>
    <Item title="Mandíbula">
      <RangeInput
        title="Largura"
        min={settings.jawBoneWidth.min}
        max={settings.jawBoneWidth.max}
        factor={settings.jawBoneWidth.factor}
        defaultValue={faceFeatures.jawBoneWidth}
        clientValue={settings.jawBoneWidth.clientValue}
        onChange={value => handleFaceFeatureChange('jawBoneWidth', value)}
      />
      <RangeInput
        title="Tamanho"
        min={settings.jawBoneBackSize.min}
        max={settings.jawBoneBackSize.max}
        factor={settings.jawBoneBackSize.factor}
        defaultValue={faceFeatures.jawBoneBackSize}
        clientValue={settings.jawBoneBackSize.clientValue}
        onChange={value => handleFaceFeatureChange('jawBoneBackSize', value)}
      />
    </Item>
    <Item title="Queixo">
      <RangeInput
        title="Altura"
        min={settings.chinBoneLowering.min}
        max={settings.chinBoneLowering.max}
        factor={settings.chinBoneLowering.factor}
        defaultValue={faceFeatures.chinBoneLowering}
        clientValue={settings.chinBoneLowering.clientValue}
        onChange={value => handleFaceFeatureChange('chinBoneLowering', value)}
      />
      <RangeInput
        title="Tamanho"
        min={settings.chinBoneLenght.min}
        max={settings.chinBoneLenght.max}
        factor={settings.chinBoneLenght.factor}
        defaultValue={faceFeatures.chinBoneLenght}
        clientValue={settings.chinBoneLenght.clientValue}
        onChange={value => handleFaceFeatureChange('chinBoneLenght', value)}
      />
      <RangeInput
        title="Largura"
        min={settings.chinBoneSize.min}
        max={settings.chinBoneSize.max}
        factor={settings.chinBoneSize.factor}
        defaultValue={faceFeatures.chinBoneSize}
        clientValue={settings.chinBoneSize.clientValue}
        onChange={value => handleFaceFeatureChange('chinBoneSize', value)}
      />
      <RangeInput
        title="Tamanho do furo"
        min={settings.chinHole.min}
        max={settings.chinHole.max}
        factor={settings.chinHole.factor}
        defaultValue={faceFeatures.chinHole}
        clientValue={settings.chinHole.clientValue}
        onChange={value => handleFaceFeatureChange('chinHole', value)}
      />
    </Item>
    <Item title="Pescoço">
      <RangeInput
        title="Espessura"
        min={settings.neckThickness.min}
        max={settings.neckThickness.max}
        factor={settings.neckThickness.factor}
        defaultValue={faceFeatures.neckThickness}
        clientValue={settings.neckThickness.clientValue}
        onChange={value => handleFaceFeatureChange('neckThickness', value)}
      />
    </Item>
  </Section>
);

export default FaceFeatures;
