import React from 'react'

import Input, { Props as InputProps } from './Input'
import Label from './Label'

import Text from '../ui-kit/Text'
import styled from 'styled-components'

type Props = InputProps & {
  label: React.ReactNode
  error?: boolean | string | undefined
  style?: React.CSSProperties
}

const Wrapper = styled.div<Pick<Props, 'error'>>`
  & > ${Label} {
    display: inline-block;
    margin-bottom: 4px;
  }

  & > ${Input} {
    margin-bottom: ${(props) => (props.error ? '0px' : '6px')};
  }
`

export default function InputGroup(props: Props) {
  const { label, style, ...inputProps } = props

  return (
    <Wrapper style={{ ...style }} error={props.error}>
      <Label htmlFor={inputProps.id}>
        {label} {!props.required && '(Optional)'}{' '}
      </Label>
      <Input {...inputProps} />
      {inputProps.error && (
        <Text color="red" family="Assistant" size={12} weight={600}>
          {inputProps.error}
        </Text>
      )}
    </Wrapper>
  )
}
