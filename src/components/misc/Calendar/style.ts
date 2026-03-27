import styled from "styled-components";
import Palette from "../../../assets/palette";

interface ActiveProps {
  isActive?: boolean
}

const Container = styled.div`
  display: grid;
  grid-template:
    "month month" 
    "weeks events"
  ;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: min-content 1fr;

  flex: 1 1 auto;
  gap: 20px;

  overflow: hidden;

  height: 100%;
  
  padding: 0px 20px;
`;

const Header = styled.div`
  grid-area: month;

  display: flex;
  align-items: center;
  justify-content: space-between;
  
  padding: 6px 12px;
  
  border-radius: 10px;
  
  width: 100%;
  
  background-color: ${Palette.items};
`;

const Weeks = styled.div`
  grid-area: weeks;

  display: flex;
  height: 100%; width: 100%;
`;

const Weekdays = styled.div`
  width: 100%; height: 100%;
  display: flex;
`;

const Weekday = styled.ul`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  
  width: 100%; height: 100%;
  
  text-align: center;
  
  border-bottom: 1px solid ${Palette.items};
  
  font-weight: 500;
`;

const Day = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  
  width: 100%; height: 100%;
  
  border-bottom: 1px solid ${Palette.items};

  padding: 4px;

  cursor: pointer;
`;

const Indicators = styled.div`
  display: grid;
  gap: 6px;

  height: 100%;
  width: 100%;
`;

const Active = styled.p<ActiveProps>`
  color: ${props => props.isActive ?? false ? Palette.white : Palette.gray };
`;

const Today = styled.p`
  font-weight: 700;
  font-size: 20px;
  color: ${Palette.blue};
`;

const Events = styled.div`
  grid-area: events;
    
  overflow-y: auto;
  
  height: 100%;
  
  padding-left: 10px;
  
  border-left: 2px solid ${Palette.items};
`;

export {
  Day,
  Active,
  Today,
  Weeks,
  Weekdays,
  Weekday,
  Container,
  Header,
  Events,
  Indicators
}