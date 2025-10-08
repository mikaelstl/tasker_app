import styled from "styled-components";
import Palette from "../../../../assets/palette";

interface ActivatedProps {
  activated: boolean;
}

const Activated = styled.span<ActivatedProps>`
  display: flex;
  align-items: center;
  gap: 6px;
  
  font-weight: 600;
  font-size: 14px;
  color: ${props => props.activated ? Palette.white : Palette.gray};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  margin-bottom: 40px;
`;

const Accordion = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  padding: 6px;
`;

const Tag = styled.div`
  padding-bottom: 20px;

  border-bottom: 2px solid $items;

  cursor: pointer;
`;

export {
  Activated,
  Content,
  Accordion,
  Tag
}