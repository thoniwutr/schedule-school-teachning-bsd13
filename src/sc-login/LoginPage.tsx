import React from 'react'
import styled from 'styled-components'

import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../sc-context/AuthContext'
import { toast } from '../sc-toast/Toast'
import { beautifulErrorMessage } from '../firebase/utils'

import { FirebaseError } from 'firebase/app'
import Text from '../ui-kit/Text'
import NewSignInForm from './LoginForm'
import smartLogo from './assets/smart-centert-logo.png'

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const DescriptionWrapper = styled.div`
  text-align: center;
  padding: 10px 0 20px 0;
`

const CreateAccountMessageWrapper = styled.div`
  text-align: center;
  margin-top: 32px;
  gap: 10px;
  display: flex;

  a:link {
    color: #2c46b5;
  }
`

const Image = styled.img`
  margin: 0 0 20px 0;
  max-width: 20%;
 max-height: 20%;
`

export default function LoginPage() {
  const { currentUser, login } = useAuth()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (currentUser) {
      navigate('/schedule')
    }
  }, [currentUser, navigate])

  return (
    <Wrapper>
      <Image src={smartLogo} alt="beam_banner" />
      <Text size={28} align="center" family="LexendDeca" padding='15px'>
        Enterprise Login
      </Text>
      <DescriptionWrapper>
        <Text size={14} family="LexendDeca" color="tableText">
          Welcome to Smart Center Schedule Teaching Program<br /> Please enter your details 
          to start using the platform
        </Text>
      </DescriptionWrapper>
      <NewSignInForm
        onSubmit={React.useCallback(
          async ({ email, password }) => {
            try {
              await login(email,password)
              navigate('/schedule')
            } catch (error) {
              toast.error(beautifulErrorMessage(error as FirebaseError))
            }
          },
          [login, navigate]
        )}
      />
    </Wrapper>
  )
}
