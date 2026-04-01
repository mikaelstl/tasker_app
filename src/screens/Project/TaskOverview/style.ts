import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  display: grid;
  grid-template-areas:
    "tskr-task-infos       tskr-task-activity"
    "tskr-task-description tskr-task-activity"
  ;
  grid-template-columns: 1fr 336px;
  grid-template-rows: min-content 1fr;
  
  width: 100%;
  height: 100%;

  overflow: hidden;
`;

const Comments = styled.div`
  grid-area: tskr-task-activity;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  
  overflow: hidden;
  
  padding: 20px;

  border: 1px solid ${Palette.items};

  #cards {
    overflow: scroll;
  }
`;

const TaskInfo = styled.div`
  grid-area: tskr-task-infos;

  display: grid;
  align-items: center;
  grid-template-areas:
    "tskr-task-links    tskr-task-links              .              ."
    "tskr-section-title tskr-date      tskr-badge     tskr-button"
    "tskr-task-tags     tskr-task-tags tskr-task-tags tskr-task-tags"
  ;
  grid-template-columns: min-content 1fr min-content min-content;
  gap: 12px;

  border-bottom: 1px solid ${Palette.items};
  padding: 30px 30px 20px 30px;

  height: fit-content;
  width: 100%;
`;

const Description = styled.div`
  grid-area: tskr-task-description;
  padding: 20px;
`;

const Links = styled.div`
  grid-area: tskr-task-links;

  display: flex;
  gap: 40px;
`;

const Tags = styled.div`
  grid-area: tskr-task-tags;

  display: flex;
  gap: 40px;
`;

const Tag = styled.div`
  display: flex;
  flex-direction: column;
`;

export {
  Container,
  Comments,
  TaskInfo,
  Description,
  Tags,
  Tag,
  Links
}