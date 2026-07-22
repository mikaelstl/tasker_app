import styled from "styled-components"
import Palette from "../../../assets/palette"

const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 12px;
  border: 1px solid ${Palette.details};
  border-radius: 8px;
  background-color: ${Palette.content};

  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${Palette.items};
  }
`

const ProjectTitle = styled.p`
  max-width: 100%;
  overflow: hidden;
  color: ${Palette.gray};
  font-size: 12px;
  font-weight: 500;
  line-height: 1.25;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Details = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
`

interface IconProps {
  $color: string
  $backgroundColor: string
}

const Icon = styled.div<IconProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 32px;

  width: 32px;
  height: 32px;
  margin-top: 2px;
  border-radius: 6px;

  color: ${({ $color }) => $color};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
`

const Content = styled.div`
  flex: 1 1 auto;
  min-width: 0;
`

const Title = styled.p`
  color: ${Palette.white};
  font-size: 14px;
  font-weight: 500;
  line-height: 1.375;
  overflow-wrap: anywhere;
`

const Time = styled.p`
  color: ${Palette.gray};
  font-size: 14px;
`

export { Card, Content, Details, Icon, ProjectTitle, Time, Title }
