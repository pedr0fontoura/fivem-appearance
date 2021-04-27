import { useNuiState } from '../../hooks/nuiState';

import Section from './components/Section';
import Item from './components/Item';
import RangeInput from './components/RangeInput';

import { PedFaceFeatures, FaceFeaturesSettings } from './interfaces';

interface FaceFeaturesProps {
  settings: FaceFeaturesSettings;
  storedData: PedFaceFeatures;
  data: PedFaceFeatures;
  handleFaceFeatureChange: (key: keyof PedFaceFeatures, value: number) => void;
}

const FaceFeatures = ({ settings, storedData, data, handleFaceFeatureChange }: FaceFeaturesProps) => {
  const { locales } = useNuiState();

  if (!locales) {
    return null;
  }

  return (
    <Section title={locales.faceFeatures.title}>
      <Item title={locales.faceFeatures.nose.title}>
        <RangeInput
          title={locales.faceFeatures.nose.width}
          min={settings.noseWidth.min}
          max={settings.noseWidth.max}
          factor={settings.noseWidth.factor}
          defaultValue={data.noseWidth}
          clientValue={storedData.noseWidth}
          onChange={value => handleFaceFeatureChange('noseWidth', value)}
        />
        <RangeInput
          title={locales.faceFeatures.nose.height}
          min={settings.nosePeakHigh.min}
          max={settings.nosePeakHigh.max}
          factor={settings.nosePeakHigh.factor}
          defaultValue={data.nosePeakHigh}
          clientValue={storedData.nosePeakHigh}
          onChange={value => handleFaceFeatureChange('nosePeakHigh', value)}
        />
        <RangeInput
          title={locales.faceFeatures.nose.size}
          min={settings.nosePeakSize.min}
          max={settings.nosePeakSize.max}
          factor={settings.nosePeakSize.factor}
          defaultValue={data.nosePeakSize}
          clientValue={storedData.nosePeakSize}
          onChange={value => handleFaceFeatureChange('nosePeakSize', value)}
        />
        <RangeInput
          title={locales.faceFeatures.nose.boneHeight}
          min={settings.noseBoneHigh.min}
          max={settings.noseBoneHigh.max}
          factor={settings.noseBoneHigh.factor}
          defaultValue={data.noseBoneHigh}
          clientValue={storedData.noseBoneHigh}
          onChange={value => handleFaceFeatureChange('noseBoneHigh', value)}
        />
        <RangeInput
          title={locales.faceFeatures.nose.peakHeight}
          min={settings.nosePeakLowering.min}
          max={settings.nosePeakLowering.max}
          factor={settings.nosePeakLowering.factor}
          defaultValue={data.nosePeakLowering}
          clientValue={storedData.nosePeakLowering}
          onChange={value => handleFaceFeatureChange('nosePeakLowering', value)}
        />
        <RangeInput
          title={locales.faceFeatures.nose.boneTwist}
          min={settings.noseBoneTwist.min}
          max={settings.noseBoneTwist.max}
          factor={settings.noseBoneTwist.factor}
          defaultValue={data.noseBoneTwist}
          clientValue={storedData.noseBoneTwist}
          onChange={value => handleFaceFeatureChange('noseBoneTwist', value)}
        />
      </Item>
      <Item title={locales.faceFeatures.eyebrows.title}>
        <RangeInput
          title={locales.faceFeatures.eyebrows.height}
          min={settings.eyeBrownHigh.min}
          max={settings.eyeBrownHigh.max}
          factor={settings.eyeBrownHigh.factor}
          defaultValue={data.eyeBrownHigh}
          clientValue={storedData.eyeBrownHigh}
          onChange={value => handleFaceFeatureChange('eyeBrownHigh', value)}
        />
        <RangeInput
          title={locales.faceFeatures.eyebrows.depth}
          min={settings.eyeBrownForward.min}
          max={settings.eyeBrownForward.max}
          factor={settings.eyeBrownForward.factor}
          defaultValue={data.eyeBrownForward}
          clientValue={storedData.eyeBrownForward}
          onChange={value => handleFaceFeatureChange('eyeBrownForward', value)}
        />
      </Item>
      <Item title={locales.faceFeatures.cheeks.title}>
        <RangeInput
          title={locales.faceFeatures.cheeks.boneHeight}
          min={settings.cheeksBoneHigh.min}
          max={settings.cheeksBoneHigh.max}
          factor={settings.cheeksBoneHigh.factor}
          defaultValue={data.cheeksBoneHigh}
          clientValue={storedData.cheeksBoneHigh}
          onChange={value => handleFaceFeatureChange('cheeksBoneHigh', value)}
        />
        <RangeInput
          title={locales.faceFeatures.cheeks.boneWidth}
          min={settings.cheeksBoneWidth.min}
          max={settings.cheeksBoneWidth.max}
          factor={settings.cheeksBoneWidth.factor}
          defaultValue={data.cheeksBoneWidth}
          clientValue={storedData.cheeksBoneWidth}
          onChange={value => handleFaceFeatureChange('cheeksBoneWidth', value)}
        />
        <RangeInput
          title={locales.faceFeatures.cheeks.width}
          min={settings.cheeksWidth.min}
          max={settings.cheeksWidth.max}
          factor={settings.cheeksWidth.factor}
          defaultValue={data.cheeksWidth}
          clientValue={storedData.cheeksWidth}
          onChange={value => handleFaceFeatureChange('cheeksWidth', value)}
        />
      </Item>
      <Item title={locales.faceFeatures.eyesAndMouth.title}>
        <RangeInput
          title={locales.faceFeatures.eyesAndMouth.eyesOpening}
          min={settings.eyesOpening.min}
          max={settings.eyesOpening.max}
          factor={settings.eyesOpening.factor}
          defaultValue={data.eyesOpening}
          clientValue={storedData.eyesOpening}
          onChange={value => handleFaceFeatureChange('eyesOpening', value)}
        />
        <RangeInput
          title={locales.faceFeatures.eyesAndMouth.lipsThickness}
          min={settings.lipsThickness.min}
          max={settings.lipsThickness.max}
          factor={settings.lipsThickness.factor}
          defaultValue={data.lipsThickness}
          clientValue={storedData.lipsThickness}
          onChange={value => handleFaceFeatureChange('lipsThickness', value)}
        />
      </Item>
      <Item title={locales.faceFeatures.jaw.title}>
        <RangeInput
          title={locales.faceFeatures.jaw.width}
          min={settings.jawBoneWidth.min}
          max={settings.jawBoneWidth.max}
          factor={settings.jawBoneWidth.factor}
          defaultValue={data.jawBoneWidth}
          clientValue={storedData.jawBoneWidth}
          onChange={value => handleFaceFeatureChange('jawBoneWidth', value)}
        />
        <RangeInput
          title={locales.faceFeatures.jaw.size}
          min={settings.jawBoneBackSize.min}
          max={settings.jawBoneBackSize.max}
          factor={settings.jawBoneBackSize.factor}
          defaultValue={data.jawBoneBackSize}
          clientValue={storedData.jawBoneBackSize}
          onChange={value => handleFaceFeatureChange('jawBoneBackSize', value)}
        />
      </Item>
      <Item title={locales.faceFeatures.chin.title}>
        <RangeInput
          title={locales.faceFeatures.chin.lowering}
          min={settings.chinBoneLowering.min}
          max={settings.chinBoneLowering.max}
          factor={settings.chinBoneLowering.factor}
          defaultValue={data.chinBoneLowering}
          clientValue={storedData.chinBoneLowering}
          onChange={value => handleFaceFeatureChange('chinBoneLowering', value)}
        />
        <RangeInput
          title={locales.faceFeatures.chin.length}
          min={settings.chinBoneLenght.min}
          max={settings.chinBoneLenght.max}
          factor={settings.chinBoneLenght.factor}
          defaultValue={data.chinBoneLenght}
          clientValue={storedData.chinBoneLenght}
          onChange={value => handleFaceFeatureChange('chinBoneLenght', value)}
        />
        <RangeInput
          title={locales.faceFeatures.chin.size}
          min={settings.chinBoneSize.min}
          max={settings.chinBoneSize.max}
          factor={settings.chinBoneSize.factor}
          defaultValue={data.chinBoneSize}
          clientValue={storedData.chinBoneSize}
          onChange={value => handleFaceFeatureChange('chinBoneSize', value)}
        />
        <RangeInput
          title={locales.faceFeatures.chin.hole}
          min={settings.chinHole.min}
          max={settings.chinHole.max}
          factor={settings.chinHole.factor}
          defaultValue={data.chinHole}
          clientValue={storedData.chinHole}
          onChange={value => handleFaceFeatureChange('chinHole', value)}
        />
      </Item>
      <Item title={locales.faceFeatures.neck.title}>
        <RangeInput
          title={locales.faceFeatures.neck.thickness}
          min={settings.neckThickness.min}
          max={settings.neckThickness.max}
          factor={settings.neckThickness.factor}
          defaultValue={data.neckThickness}
          clientValue={storedData.neckThickness}
          onChange={value => handleFaceFeatureChange('neckThickness', value)}
        />
      </Item>
    </Section>
  );
};

export default FaceFeatures;
