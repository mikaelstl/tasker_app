import styled from "styled-components";
import Palette from "../../../assets/palette";

const Card = styled.div`
  display: grid;

  grid-template-areas: "task-leading tskr-title tskr-priority"
                       "task-leading tskr-avatar tskr-date";
  grid-template-columns: min-content 1fr 1.3fr;
  grid-template-rows: auto min-content min-content;
  
  gap: 10px;

  overflow: hidden;

  padding: 10px 10px 0px 0px;
  border: 1px solid ${Palette.details};
  border-radius: 6px;

  background-color: ${Palette.items};

  width: 270px;
  height: 100px;

  .tskr-priority {
    grid-area: tskr-priority;
    display: flex;
    justify-content: flex-end;
  }

  .tskr-date {
    grid-area: tskr-date;
    display: flex;
    align-items: end;
    height: 100%;
    width: 100%;
  }
`;

const Leading = styled.div`
  grid-area: task-leading;

  width: 4px;
  height: 100%;
  background-color: ${Palette.blue};
`;

export {
  Card,
  Leading,
}
