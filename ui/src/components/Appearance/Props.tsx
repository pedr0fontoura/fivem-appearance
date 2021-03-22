import { useNuiState } from '../../hooks/nuiState';

import Section from './components/Section';
import Item from './components/Item';
import { FlexWrapper } from './styles';
import Input from './components/Input';

import { PropSettings, PedProp } from './interfaces';

interface PropsProps {
  settings: PropSettings[];
  data: PedProp[];
  storedData: PedProp[];
  handlePropDrawableChange: (prop_id: number, drawable: number) => void;
  handlePropTextureChange: (prop_id: number, texture: number) => void;
}

interface DataById<T> {
  [key: number]: T;
}

const Props = ({ settings, data, storedData, handlePropDrawableChange, handlePropTextureChange }: PropsProps) => {
  const { locales } = useNuiState();

  const settingsById = settings.reduce((object, { prop_id, drawable, texture }) => {
    return { ...object, [prop_id]: { drawable, texture } };
  }, {} as DataById<Omit<PropSettings, 'prop_id'>>);

  const propsById: any = data.reduce((object, { prop_id, drawable, texture }) => {
    return { ...object, [prop_id]: { drawable, texture } };
  }, {} as DataById<Omit<PedProp, 'prop_id'>>);

  const storedPropsById: any = storedData.reduce((object, { prop_id, drawable, texture }) => {
    return { ...object, [prop_id]: { drawable, texture } };
  }, {} as DataById<Omit<PedProp, 'prop_id'>>);

  if (!locales) {
    return null;
  }

  return (
    <Section title={locales.props.title}>
      <Item title={locales.props.hats}>
        <FlexWrapper>
          <Input
            title={locales.props.drawable}
            min={settingsById[0].drawable.min}
            max={settingsById[0].drawable.max}
            defaultValue={propsById[0].drawable}
            clientValue={storedPropsById[0].drawable}
            onChange={value => handlePropDrawableChange(0, value)}
          />
          <Input
            title={locales.props.texture}
            min={settingsById[0].texture.min}
            max={settingsById[0].texture.max}
            defaultValue={propsById[0].texture}
            clientValue={storedPropsById[0].texture}
            onChange={value => handlePropTextureChange(0, value)}
          />
        </FlexWrapper>
      </Item>
      <Item title={locales.props.glasses}>
        <FlexWrapper>
          <Input
            title={locales.props.drawable}
            min={settingsById[1].drawable.min}
            max={settingsById[1].drawable.max}
            defaultValue={propsById[1].drawable}
            clientValue={storedPropsById[1].drawable}
            onChange={value => handlePropDrawableChange(1, value)}
          />
          <Input
            title={locales.props.texture}
            min={settingsById[1].texture.min}
            max={settingsById[1].texture.max}
            defaultValue={propsById[1].texture}
            clientValue={storedPropsById[1].texture}
            onChange={value => handlePropTextureChange(1, value)}
          />
        </FlexWrapper>
      </Item>
      <Item title={locales.props.ear}>
        <FlexWrapper>
          <Input
            title={locales.props.drawable}
            min={settingsById[2].drawable.min}
            max={settingsById[2].drawable.max}
            defaultValue={propsById[2].drawable}
            clientValue={storedPropsById[2].drawable}
            onChange={value => handlePropDrawableChange(2, value)}
          />
          <Input
            title={locales.props.texture}
            min={settingsById[2].texture.min}
            max={settingsById[2].texture.max}
            defaultValue={propsById[2].texture}
            clientValue={storedPropsById[2].texture}
            onChange={value => handlePropTextureChange(2, value)}
          />
        </FlexWrapper>
      </Item>
      <Item title={locales.props.watches}>
        <FlexWrapper>
          <Input
            title={locales.props.drawable}
            min={settingsById[6].drawable.min}
            max={settingsById[6].drawable.max}
            defaultValue={propsById[6].drawable}
            clientValue={storedPropsById[6].drawable}
            onChange={value => handlePropDrawableChange(6, value)}
          />
          <Input
            title={locales.props.texture}
            min={settingsById[6].texture.min}
            max={settingsById[6].texture.max}
            defaultValue={propsById[6].texture}
            clientValue={storedPropsById[6].texture}
            onChange={value => handlePropTextureChange(6, value)}
          />
        </FlexWrapper>
      </Item>
      <Item title={locales.props.bracelets}>
        <FlexWrapper>
          <Input
            title={locales.props.drawable}
            min={settingsById[7].drawable.min}
            max={settingsById[7].drawable.max}
            defaultValue={propsById[7].drawable}
            clientValue={storedPropsById[7].drawable}
            onChange={value => handlePropDrawableChange(7, value)}
          />
          <Input
            title={locales.props.texture}
            min={settingsById[7].texture.min}
            max={settingsById[7].texture.max}
            defaultValue={propsById[7].texture}
            clientValue={storedPropsById[7].texture}
            onChange={value => handlePropTextureChange(7, value)}
          />
        </FlexWrapper>
      </Item>
    </Section>
  );
};

export default Props;
