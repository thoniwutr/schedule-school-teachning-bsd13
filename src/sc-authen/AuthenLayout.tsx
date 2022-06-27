import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Divider from '@mui/material/Divider';
import smartBanner from './assets/smart-banner.png'

const Wrapper = styled.div`
  height: 100%;
  background-image: linear-gradient(90deg, #102066, #2c46b5);
  background-attachment: fixed;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 115px 120px;

  @media (max-width: 768px) {
    padding: 100px 40px;
  }
`

const OutletWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const ContentWrapper = styled.div`
  background-color: white;
  border-radius: 0 10px 10px 0;
  width: 100%;
  height: 100%;
  padding: 0px 100px;

  @media (max-width: 768px) {
    border-radius: 10px;
  }
`

const Image = styled.img`
  border-radius: 9px 0 0 9px;
  height: 100%;
  @media (max-width: 768px) {
    display: none;
  }
`

export default function AuthLayout() {
  return (
    <Wrapper>
      <OutletWrapper>
          <Image src={smartBanner} alt="beam_banner" />
          <Divider orientation="vertical" flexItem />
          <ContentWrapper>
            <Outlet />
          </ContentWrapper>

      </OutletWrapper>
    </Wrapper>
  )
}
