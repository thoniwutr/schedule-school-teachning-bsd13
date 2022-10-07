import React from 'react'
import styled from 'styled-components'
import { Colors } from '../sc-design/colors'

import { input } from '../sc-design/mixins'

export type Props = {
  borderless?: boolean
  error?: boolean | string | undefined
} & React.InputHTMLAttributes<HTMLInputElement>

const Input = styled.input<Props>`
  ${input()}
  height: 45px;
  border-width: ${(props) => props.borderless && 0};
  border: ${(props) => props.error && `2px solid ${Colors.red}`};
  width: 100%;

  &[type='checkbox'] {
    height: auto;
    width: auto;
  }
`

export default Input
