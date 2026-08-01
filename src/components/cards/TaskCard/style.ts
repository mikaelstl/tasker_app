import Palette from "@/assets/palette";
import styled from "styled-components";

const Card = styled.div`
  width: 320px;
  max-width: 100%;

  cursor: pointer;

  background-color: ${Palette.items};

  border-radius: 0.75rem;

  color: ${Palette.white};

  transition:
    background-color 150ms ease;

  &:hover {
    background-color: ${Palette.tool_bars};
  }

  &:focus-visible {
    outline: 2px solid ${Palette.lightBlue};
    outline-offset: 2px;
  }

  overflow: hidden;
`;

const CardHeader = styled.div`
  padding: 0.75rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  gap: 0.75rem;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.25rem;

  min-width: 0;
`;

const CodeContainer = styled.div`
  display: flex;
  align-items: center;

  gap: 0.25rem;

  color: ${Palette.lightBlue};
`;

const Code = styled.p`
  margin: 0;

  color: ${Palette.gray};

  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 500;
`;

const CardTitle = styled.h3`
  margin: 0;

  color: ${Palette.white};

  font-size: 1rem;
  line-height: 1.375;
  font-weight: 600;

  overflow: hidden;

  display: -webkit-box;

  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const CardContent = styled.div`
  padding: 0 1.5rem 1rem;

  height: 100%;

  border: 1px solid;
`;

const Description = styled.p`
  margin: 0;

  color: ${Palette.gray};

  font-size: 0.875rem;
  line-height: 1.25rem;

  overflow: hidden;

  display: -webkit-box;

  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0.75rem;

  border-top: 1px solid ${Palette.details};
`;

export {
  Card,
  CardHeader,
  HeaderContainer,
  TitleContainer,
  CodeContainer,
  Code,
  CardTitle,
  CardContent,
  Description,
  CardFooter
}
