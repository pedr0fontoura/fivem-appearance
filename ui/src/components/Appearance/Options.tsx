import { useState, useRef, useEffect, ReactElement, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { FaVideo, FaStreetView, FaUndo, FaRedo, FaSmile, FaMale, FaShoePrints } from 'react-icons/fa';

interface ToggleButtonProps {
  active: boolean;
}

interface ToggleOptionProps {
  active: boolean;
  onClick: () => void;
}

interface ExtendendContainerProps {
  width: number;
}

interface ExtendendOptionProps {
  icon: ReactElement;
}

interface CameraState {
  head: boolean;
  body: boolean;
  bottom: boolean;
}

const INITIAL_CAMERA_STATE = { head: false, body: false, bottom: false };
const INITIAL_ROTATE_STATE = { left: false, right: false };

const Container = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;

  padding: 20px 0;
`;

const ToggleButton = styled.button<ToggleButtonProps>`
  height: 40px;
  width: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 0;
  border-radius: 4px;

  box-shadow: 0px 0px 5px rgb(0, 0, 0, 0.2);

  transition: all 0.2s;

  color: rgba(255, 255, 255, 0.9);
  background: rgba(0, 0, 0, 0.7);

  &:hover {
    color: rgba(255, 255, 255, 1);
    background: rgba(0, 0, 0, 0.9);
  }

  &:active {
    transform: scale(0.8);
  }

  ${({ active }) =>
    active &&
    css`
      color: rgba(0, 0, 0, 0.7);
      background: rgba(255, 255, 255);

      &:hover {
        color: rgba(0, 0, 0, 0.9);
        background: rgba(255, 255, 255, 1);
      }
    `}
`;

const Option = styled.button`
  height: 40px;
  width: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border: 0;
  border-radius: 4px;

  box-shadow: 0px 0px 5px rgb(0, 0, 0, 0.2);

  transition: all 0.1s;

  color: rgba(255, 255, 255, 0.9);
  background: rgba(0, 0, 0, 0.7);

  &:hover {
    color: rgba(255, 255, 255, 1);
    background: rgba(0, 0, 0, 0.9);
  }

  &:active {
    transform: scale(0.8);
    color: rgba(0, 0, 0, 0.7);
    background: rgba(255, 255, 255);
  }
`;

const ExtendedContainer = styled.div<ExtendendContainerProps>`
  height: 40px;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  width: ${({ width }) => `${width + 40}px`};

  transition: width 0.3s;

  overflow: hidden;
`;

const ExtendedIcon = styled.div`
  height: 40px;
  width: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border: 0;
  border-radius: 4px;

  color: rgba(255, 255, 255, 0.9);
  background: rgba(0, 0, 0, 0.7);
`;

const ExtendedChildren = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;

  padding-left: 10px;
`;

const ToggleOption: React.FC<ToggleOptionProps> = ({ children, active, onClick }) => {
  return (
    <ToggleButton type="button" active={active} onClick={onClick}>
      {children}
    </ToggleButton>
  );
};

const ExtendedOption: React.FC<ExtendendOptionProps> = ({ children, icon }) => {
  const [extended, setExtended] = useState(true);

  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
      setExtended(false);
    }
  }, [ref, setWidth]);

  const handleMouseEnter = useCallback(() => {
    setExtended(true);
  }, [setExtended]);

  const handleMouseLeave = useCallback(() => {
    setExtended(false);
  }, [setExtended]);

  return (
    <ExtendedContainer width={extended ? width : 0} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <ExtendedIcon>{icon}</ExtendedIcon>
      <ExtendedChildren ref={ref}>{children}</ExtendedChildren>
    </ExtendedContainer>
  );
};

const Options: React.FC = () => {
  const [camera, setCamera] = useState(INITIAL_CAMERA_STATE);
  const [rotate, setRotate] = useState(INITIAL_ROTATE_STATE);

  const toggleCamera = useCallback(
    (key: keyof CameraState) => {
      setCamera(state => {
        const currentCameraState = state[key];

        const cameraState = { ...state };

        Object.assign(cameraState, INITIAL_CAMERA_STATE);

        return { ...cameraState, [key]: !currentCameraState };
      });
    },
    [setCamera],
  );

  const handleRotateLeft = useCallback(() => {
    setRotate(state => ({ left: !state.left, right: false }));
  }, [setRotate]);

  const handleRotateRight = useCallback(() => {
    setRotate(state => ({ left: false, right: !state.right }));
  }, [setRotate]);

  return (
    <Container>
      <ExtendedOption icon={<FaVideo size={20} />}>
        <ToggleOption active={camera.head} onClick={() => toggleCamera('head')}>
          <FaSmile size={20} />
        </ToggleOption>
        <ToggleOption active={camera.body} onClick={() => toggleCamera('body')}>
          <FaMale size={20} />
        </ToggleOption>
        <ToggleOption active={camera.bottom} onClick={() => toggleCamera('bottom')}>
          <FaShoePrints size={20} />
        </ToggleOption>
      </ExtendedOption>
      <Option>
        <FaStreetView size={20} />
      </Option>
      <ToggleOption active={rotate.left} onClick={handleRotateLeft}>
        <FaRedo size={20} />
      </ToggleOption>
      <ToggleOption active={rotate.right} onClick={handleRotateRight}>
        <FaUndo size={20} />
      </ToggleOption>
    </Container>
  );
};

export default Options;
