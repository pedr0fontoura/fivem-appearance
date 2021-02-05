import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useTransition, animated } from 'react-spring';

interface SectionProps {
  title: string;
}

interface HeaderProps {
  active: boolean;
}

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  color: #fff;

  user-select: none;

  & + div {
    margin-top: 10px;
  }
`;

const Header = styled.div<HeaderProps>`
  width: 100%;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 10px;
  border-radius: 4px;

  z-index: 2;

  background: rgba(0, 0, 0, ${({ active }) => (active ? '0.9' : '0.7')});

  box-shadow: 0px 0px 5px rgb(0, 0, 0, 0.2);

  transition: background 0.1s;

  &:hover {
    background: rgba(0, 0, 0, 0.9);
    cursor: pointer;
  }

  span {
    font-size: 15px;
  }
`;

const Items = styled.div`
  padding: 0 2px 5px 2px;
`;

const Section: React.FC<SectionProps> = ({ children, title }) => {
  const [active, setActive] = useState(true);

  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const itemsTransition = useTransition(active, null, {
    from: { transform: 'translateY(-50px)', opacity: 0, height: 0 },
    enter: { transform: 'translateY(0)', opacity: 1, height },
    leave: { transform: 'translateY(-50px)', opacity: 0, height: 0 },
  });

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight);
      setActive(false);
    }
  }, [ref, setHeight]);

  return (
    <Container>
      <Header active={active} onClick={() => setActive(state => !state)}>
        <span>{title}</span>
        {active ? <FiChevronUp size={30} /> : <FiChevronDown size={30} />}
      </Header>
      {children &&
        itemsTransition.map(
          ({ item, key, props }) =>
            item && (
              <animated.div key={key} style={props}>
                <Items ref={ref}>{children}</Items>
              </animated.div>
            ),
        )}
    </Container>
  );
};

export default Section;
