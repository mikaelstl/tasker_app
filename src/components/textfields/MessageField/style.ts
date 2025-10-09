import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  display: flex;
  gap: 10px;
  
  width: 100%;
  
  padding: 10px 20px;
  border-top: 2px solid ${Palette.items};
  border-bottom: 2px solid ${Palette.items};
`
  
const Search = styled.div`
  display: flex;
  gap: 10px;
  
  width: 100%;
  
  align-items: center;
  
  border-right: 2px solid ${Palette.items};
  
  input, input:focus {
    background: none;
    outline: none;
    width: 100%;
  }
  input::placeholder {
    font-size: 16px;
    opacity: 100%;
    color: white;
    font-weight: 500;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;

  width: min-content;

  background: none;

  font-weight: 600;
`;

export {
  Container,
  Search,
  Button
}