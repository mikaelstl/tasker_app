import Palette from "@/assets/palette";
import styled from "styled-components";

const ProjectFilter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  width: min(100%, 360px);
  padding: 0 20px;

  label {
    color: ${Palette.gray};
    font-size: 13px;
    font-weight: 500;
  }
`;

const ProjectSelect = styled.select`
  width: 100%;
  padding: 10px 12px;
  border-radius: 6px;

  color: ${Palette.white};
  background-color: ${Palette.items};

  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${Palette.lightBlue_50};
  }

  &:disabled {
    color: ${Palette.gray};
    cursor: not-allowed;
  }

  option {
    background-color: ${Palette.items};
  }
`;

export { ProjectFilter, ProjectSelect };
