import styled from "styled-components"
import Palette from "../../../assets/palette";
import { useState } from "react";

interface SwitchProps {
  activated: boolean
}

const Toggle = styled.button<SwitchProps>`
  grid-area: tskr-toggle;

  display: flex;
  justify-content: ${props => props.activated ? 'end' : 'start'};

  padding: 4px;
  width: 48px;
  border-radius: 50px;
  background-color: ${props => props.activated ? Palette.blue : Palette.details};
`;

const Slider = styled.span`
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50px;
  background-color: ${Palette.white};
`;

// const Input = styled.input`
//   display: none;
//   width: 100%;
// `

export function ToggleSwitch() {
  const [ enable, setEnable ] = useState(false);
  
  const handleToggle = () => {
    setEnable(!enable);
  }

  return (
    <Toggle activated={enable} onClick={handleToggle}>
      <Slider/>
    </Toggle>
  )
}