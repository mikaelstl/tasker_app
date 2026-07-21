import { Scroller } from "@/components/misc/Scroller";
import Palette from "@/assets/palette";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;

  gap: 20px;

  overflow: hidden;
  
  height: 100%;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  
  padding: 0px 20px;
  
  width: 100%; height: 100%;
  
  overflow: hidden;
`;

const Items = styled(Scroller)`
  padding: 20px 0px;

  gap: 12px;

  &.vertical {
    overflow-y: auto;
    overflow-y: overlay;
  }
`;

const StageFilterControl = styled.label`
  display: flex;
  align-items: center;
  align-self: flex-end;
  gap: 8px;

  margin-top: 10px;

  color: ${Palette.white};
  font-size: 14px;
  font-weight: 600;

  select {
    padding: 8px 12px;

    color: ${Palette.white};
    background-color: ${Palette.items};
    border: 1px solid ${Palette.details};
    border-radius: 8px;
    outline: none;
  }
`;

export {
  Container,
  Content,
  Items,
  StageFilterControl,
}
