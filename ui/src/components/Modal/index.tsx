import { Wrapper, Buttons } from './styles';

interface ModalProps {
  title: string;
  description?: string;
  handleAccept: () => Promise<void> | void;
  handleDecline: () => Promise<void> | void;
}

const Modal: React.FC<ModalProps> = ({ title, description, handleAccept, handleDecline }) => {
  return (
    <Wrapper>
      <p>{title}</p>
      <span>{description}</span>
      <Buttons>
        <button type="button" onClick={handleAccept}>
          Sim
        </button>
        <button type="button" onClick={handleDecline}>
          Não
        </button>
      </Buttons>
    </Wrapper>
  );
};

export default Modal;
