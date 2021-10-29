import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Icon, Link } from '@material-ui/core'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import styled from 'styled-components'
import ethereumlogo from '../../assets/images/ethereum-logo.png'
import binancelogo from '../../assets/images/binancelogo.png'
import htlogo from '../../assets/images/htlogo.png'

const StyledIcon = styled(Icon)`
  display: flex;
  width: inherit;
  height: inherit;
  font-family: 'Arial', sans-serif;
`

const StyledButton = styled(Button)`
width: auto;
background-color: background-color: ${({ theme }) => theme.bg1};
font-family: 'Arial', sans-serif;
border-radius: 5px 5px 5px 5px;
@media (max-width: 768px) {
  width: auto;
}
`

const StyledSpan = styled.span`
  @media (max-width: 768px) {
    display: none;
    font-family: 'Inter', sans-serif;
  }
`

const StyledChainModal = styled.div`
  margin-right: 5px;
`

const StyledMenuItem = styled(MenuItem)`
  display: flex;
  flex-direction: column;
`

export default function MenuPopupState() {
  return (
    <StyledChainModal>
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <>
            <StyledButton
              variant="contained"
              {...bindTrigger(popupState)}
              startIcon={
                <StyledIcon>
                  <img src={binancelogo} alt="ht" />
                </StyledIcon>
              }
            >
              <StyledSpan />
            </StyledButton>
            <Menu {...bindMenu(popupState)}>
              <StyledMenuItem onClick={popupState.close}>
                <Link href="https://bsc.hokkfi.com">
                  <img src={ethereumlogo} width={25} height={25} alt="ether" />
                </Link>
                <br />
                <Link href="https://heco.hokkfi.com">
                  <img src={htlogo} width={25} height={25} alt="ether" />
                </Link>
              </StyledMenuItem>
            </Menu>
          </>
        )}
      </PopupState>
    </StyledChainModal>
  )
}
