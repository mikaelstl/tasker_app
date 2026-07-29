import Palette from "@/assets/palette"
import styled from "styled-components"

const ModalOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 20;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;
  background-color: #00000080;
`

const ModalDialog = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 0;

  width: min(980px, 100%);
  max-height: min(90vh, 900px);
  padding: 20px;
  border-radius: 12px;
  background-color: ${Palette.tool_bars};
  overflow: hidden;
`

const ModalHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`

const ModalTitle = styled.h2`
  color: ${Palette.white};
  font-size: 18px;
  font-weight: 700;
`

const ModalCloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 999px;
  color: ${Palette.white_50};
  background-color: ${Palette.items};
  cursor: pointer;

  svg {
    width: 18px;
    height: 18px;
  }
`

const ModalDescription = styled.p`
  color: ${Palette.white_50};
  font-size: 13px;
  line-height: 1.5;
  max-width: 72ch;
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  gap: 16px;
  min-height: 0;
  overflow: hidden;
`

export {
  ModalOverlay,
  ModalDialog,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ModalDescription,
  ModalContent
}