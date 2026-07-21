import Palette from "@/assets/palette";
import styled from "styled-components";

const Card = styled.div`
  min-width: 48rem;

  cursor: pointer;

  background-color: ${Palette.items};

  border: 1px solid transparent;
  border-radius: 0.75rem;

  color: ${Palette.white};

  transition:
    border-color 150ms ease,
    box-shadow 150ms ease,
    background-color 150ms ease;

  &:hover {
    border-color: ${Palette.blue};

    box-shadow:
      0 1px 2px ${Palette.gray_25},
      0 2px 6px ${Palette.gray_25};
  }

  overflow: hidden;
`;

const CardHeader = styled.div`
  padding: 1.5rem;
  padding-bottom: 0.75rem;
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

  svg {
    fill: ${Palette.lightBlue};
  }
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

  padding: 1rem 1.5rem 1.5rem;

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