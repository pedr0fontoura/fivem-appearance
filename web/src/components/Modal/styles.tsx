import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;

  position: absolute;

  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  user-select: none;

  font-size: 1.5rem;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  text-transform: uppercase;
  text-shadow: 3px 3px rgba(0, 0, 0, 0.5);

  background: rgba(0, 0, 0, 0.9);

  span {
    font-size: 1rem;
    opacity: 0.5;
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 100px;

  button {
    height: 40px;
    width: 100px;
    margin: 0 50px;

    display: flex;
    justify-content: center;
    align-items: center;

    color: #fff;
    font-size: 1.5rem;
    font-weight: 400;
    text-transform: uppercase;

    opacity: 0.8;
    transition: all 0.1s;

    background: none;
    border: 0;

    &:hover {
      transform: scale(1.1);
      opacity: 1;
      text-shadow: 0px 2px 2px rgba(251, 255, 190, 0.2);
    }
  }
`;
