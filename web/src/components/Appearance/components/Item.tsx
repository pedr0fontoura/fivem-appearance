import styled from 'styled-components';

interface ItemProps {
  title?: string;
}

const Container = styled.div`
  margin-top: 0.5rem;

  display: flex;
  flex-direction: column;

  padding: 10px;
  border-radius: 2px;

  background: rgba(0, 0, 0, 0.3);

  span {
    color: #fff;
    font-size: 14px;
  }
`;

const Inputs = styled.div`
  width: 100%;
  display: inline-flex;
  flex-wrap: wrap;

  margin-top: 10px;

  > div {
    & + div {
      margin-top: 10px;
    }
  }
`;

const Item: React.FC<ItemProps> = ({ children, title }) => {
  return (
    <Container>
      {title && <span>{title}</span>}
      <Inputs>{children}</Inputs>
    </Container>
  );
};

export default Item;
