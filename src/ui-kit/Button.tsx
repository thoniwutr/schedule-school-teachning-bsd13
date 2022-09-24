import React from 'react'
import styled, { css } from 'styled-components'

import { Colors } from '../sc-design/colors'
import Loading from './Loading'

type Props = {
  variant?: 'default' | 'danger' | 'outlined'
  fontSize?: number
  loading?: boolean
  radius?: number
  width?: string
  padding?: string
  icon?: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const buttonVariants = {
  default: {
    backgroundColor: Colors['$c-blue5'],
    color: null,
    borderColor: Colors['$c-blue5'],
    hover: {
      backgroundColor: '#08154D',
    },
    disabled: {
      backgroundColor: Colors.gray,
      color: Colors.white,
      borderColor: Colors.gray,
    },
  },
  danger: {
    backgroundColor: Colors.red,
    color: null,
    borderColor: Colors.red,
    hover: {
      backgroundColor: '#e23004',
    },
    disabled: {
      backgroundColor: Colors.gray,
      color: Colors.white,
      borderColor: Colors.gray,
    },
  },
  outlined: {
    backgroundColor: Colors.white,
    color: Colors['$c-blue3'],
    borderColor: Colors['$c-blue3'],
    hover: {
      backgroundColor: 'rgba(180, 194, 255, 0.5)',
    },
    disabled: {
      backgroundColor: Colors.white,
      color: Colors.gray,
      borderColor: Colors.gray,
    },
  },
}

const Wrapper = styled.button<Props>`
  height: 40px;
  font-family: Assistant;
  font-weight: 600;
  font-size: ${(props) => props.fontSize ?? '1'}rem;
  color: ${Colors.white};
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  padding-left: 18px;
  padding-right: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
  transition: all 0.1s ease-in;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  &:active {
    transform: scale(0.96);
  }

  ${({ variant, disabled }) => {
    const btnVariable = variant && buttonVariants[variant]

    if (btnVariable) {
      return css`
        color: ${disabled ? btnVariable.disabled.color : btnVariable.color};
        background-color: ${disabled
          ? btnVariable.disabled.backgroundColor
          : btnVariable.backgroundColor};

        border-color: ${disabled
          ? btnVariable.disabled.borderColor
          : btnVariable.borderColor};

        &:hover {
          background-color: ${!disabled && btnVariable.hover.backgroundColor};
        }
      `
    }
  }}
`

const ChildrenWrapper = styled.span`
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export default function Button({
  variant = 'default',
  loading,
  icon,
  children,
  ...rest
}: Props) {
  return (
    <Wrapper {...rest} variant={variant} disabled={loading || rest.disabled}>
      {loading ? (
        <Loading
          width={15}
          height={15}
          color={buttonVariants[variant].disabled.color}
        />
      ) : (
        <React.Fragment>
          {icon && <span>{icon}</span>}
          <ChildrenWrapper>{children}</ChildrenWrapper>
        </React.Fragment>
      )}
    </Wrapper>
  )
}

export const BlueButton = styled.button<{ width?: number; margin?: string }>`
  width: ${(props) => props.width}px;
  margin: ${(props) => props.margin};
  height: 40px;
  font-family: 'Assistant';
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.31;
  letter-spacing: normal;
  text-align: center;
  border: 2px solid #2c46b5;
  border-radius: 4px;
  cursor: pointer;
  background-color: #2c46b5;
  color: #ffffff;
  &:hover {
    background-color: rgb(0, 29, 160);
    border: 2px solid rgb(0, 29, 160);
    color: #ffffff;
  }
  &:disabled {
    border: 1px solid #acacac;
    background-color: #e4e4e4;
    color: #a1a1a1;
  }
`
