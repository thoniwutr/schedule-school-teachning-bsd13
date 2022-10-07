import styled from 'styled-components'

export const Wrapper = styled.form`
  min-height: 100vh;
  background-color: white;
  width: 100%;
  padding-right: 50px;
`;

export const HeaderWrapper = styled.div`
  background-color: white;
  width: 100%;
  align-items: center;
  display: flex;
`

export const LeadingWrapper = styled.div`
  padding: 20px 0px;
  width: 100%;
  display: flex;
  justify-content: end;
  background-color: white;

  &:hover {
    cursor: pointer;
  }
`