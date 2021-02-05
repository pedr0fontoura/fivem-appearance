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
        min={settings.min}
        max={settings.max}
        factor={settings.factor}
        defaultValue={faceFeatures.noseWidth}
        onChange={value => handleFaceFeatureChange('noseWidth', value)}
      />
      <RangeInput
        title="Altura"
        min={settings.min}
        max={settings.max}
        factor={settings.factor}
        defaultValue={faceFeatures.nosePeakHigh}
        onChange={value => handleFaceFeatureChange('nosePeakHigh', value)}
      />
      <RangeInput
        title="Tamanho"
        min={settings.min}
        max={settings.max}
        factor={settings.factor}
        defaultValue={faceFeatures.nosePeakSize}
        onChange={value => handleFaceFeatureChange('nosePeakSize', value)}
      />
      <RangeInput
        title="Altura do osso"
        min={settings.min}
        max={settings.max}
        factor={settings.factor}
        defaultValue={faceFeatures.noseBoneHigh}
        onChange={value => handleFaceFeatureChange('noseBoneHigh', value)}
      />
      <RangeInput
        title="Altura da ponta"
        min={settings.min}
        max={settings.max}
        factor={settings.factor}
        defaultValue={faceFeatures.nosePeakLowering}
        onChange={value => handleFaceFeatureChange('nosePeakLowering', value)}
      />
      <RangeInput
        title="Deslocamento"
        min={settings.min}
        max={settings.max}
        factor={settings.factor}
        defaultValue={faceFeatures.noseBoneTwist}
        onChange={value => handleFaceFeatureChange('noseBoneTwist', value)}
      />
    </Item>
    <Item title="Sobrancelha">
      <RangeInput
        title="Altura"
        min={settings.min}
        max={settings.max}
        factor={settings.factor}
        defaultValue={faceFeatures.eyeBrownHigh}
        onChange={value => handleFaceFeatureChange('eyeBrownHigh', value)}
      />
      <RangeInput
        title="Profundidade"
        min={settings.min}
        max={settings.max}
        factor={settings.factor}
        defaultValue={faceFeatures.eyeBrownForward}
        onChange={value => handleFaceFeatureChange('eyeBrownForward', value)}
      />
    </Item>
    <Item title="Bochecha">
      <RangeInput
        title="Altura da maçã do rosto"
        min={settings.min}
        max={settings.max}
        factor={settings.factor}
        defaultValue={faceFeatures.cheeksBoneHigh}
        onChange={value => handleFaceFeatureChange('cheeksBoneHigh', value)}
      />
      <RangeInput
        title="Largura da maçã do rosto"
        min={-10}
        max={10}
        factor={0.1}
        defaultValue={faceFeatures.cheeksBoneWidth}
        onChange={value => handleFaceFeatureChange('cheeksBoneWidth', value)}
      />
      <RangeInput
        title="Largura"
        min={settings.min}
        max={settings.max}
        factor={settings.factor}
        defaultValue={faceFeatures.cheeksWidth}
        onChange={value => handleFaceFeatureChange('cheeksWidth', value)}
      />
    </Item>
    <Item title="Olhos e boca">
      <RangeInput
        title="Abertura dos olhos"
        min={settings.min}
        max={settings.max}
        factor={settings.factor}
        defaultValue={faceFeatures.eyesOpening}
        onChange={value => handleFaceFeatureChange('eyesOpening', value)}
      />
      <RangeInput
        title="Espessura dos lábios"
        min={settings.min}
        max={settings.max}
        factor={settings.factor}
        defaultValue={faceFeatures.lipsThickness}
        onChange={value => handleFaceFeatureChange('lipsThickness', value)}
      />
    </Item>
    <Item title="Mandíbula">
      <RangeInput
        title="Largura"
        min={settings.min}
        max={settings.max}
        factor={settings.factor}
        defaultValue={faceFeatures.jawBoneWidth}
        onChange={value => handleFaceFeatureChange('jawBoneWidth', value)}
      />
      <RangeInput
        title="Tamanho"
        min={settings.min}
        max={settings.max}
        factor={settings.factor}
        defaultValue={faceFeatures.jawBoneBackSize}
        onChange={value => handleFaceFeatureChange('jawBoneBackSize', value)}
      />
    </Item>
    <Item title="Queixo">
      <RangeInput
        title="Altura"
        min={settings.min}
        max={settings.max}
        factor={settings.factor}
        defaultValue={faceFeatures.chinBoneLowering}
        onChange={value => handleFaceFeatureChange('chinBoneLowering', value)}
      />
      <RangeInput
        title="Tamanho"
        min={settings.min}
        max={settings.max}
        factor={settings.factor}
        defaultValue={faceFeatures.chinBoneLenght}
        onChange={value => handleFaceFeatureChange('chinBoneLenght', value)}
      />
      <RangeInput
        title="Largura"
        min={settings.min}
        max={settings.max}
        factor={settings.factor}
        defaultValue={faceFeatures.chinBoneSize}
        onChange={value => handleFaceFeatureChange('chinBoneSize', value)}
      />
      <RangeInput
        title="Tamanho do furo"
        min={settings.min}
        max={settings.max}
        factor={settings.factor}
        defaultValue={faceFeatures.chinHole}
        onChange={value => handleFaceFeatureChange('chinHole', value)}
      />
    </Item>
    <Item title="Pescoço">
      <RangeInput
        title="Espessura"
        min={settings.min}
        max={settings.max}
        factor={settings.factor}
        defaultValue={faceFeatures.neckThickness}
        onChange={value => handleFaceFeatureChange('neckThickness', value)}
      />
    </Item>
  </Section>
);

export default FaceFeatures;
