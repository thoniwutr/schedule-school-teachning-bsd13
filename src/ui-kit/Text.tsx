import React from 'react'
import styled from 'styled-components'

import { Color, Colors } from '../sc-design/colors'

type Props = {
  padding?: string
  size?: number
  // Better fixed color for this system
  color?: Color
  family?: 'LexendDeca' | 'Assistant'
  weight?: 'bold' | 'lighter' | 'normal' | number
  transform?: 'uppercase' | 'lowercase' | 'capitalize'
  letterSpacing?: number
  display?: 'block' | 'inline' | 'inline-block'
  align?: 'left' | 'right' | 'center'
  wordBreak?: 'break-all' | 'break-word' | 'initial' | 'keep-all'
  children: React.ReactNode
  style?: React.CSSProperties
  whiteSpace?:
    | 'normal'
    | 'pre'
    | 'nowrap'
    | 'pre-wrap'
    | 'pre-line'
    | 'break-spaces'

  onClick?: () => void
}

const Span = styled.span<Props>`
  white-space: ${(props) => props.whiteSpace};
  padding: ${(props) => props.padding};
  display: ${(props) => props.display};
  color: ${(props) => props.color && Colors[props.color]};
  font-size: ${(props) => props.size && `${props.size / 16}rem`};
  font-family: ${(props) => props.family};
  font-weight: ${(props) => props.weight};
  text-transform: ${(props) => props.transform};
  letter-spacing: ${(props) =>
    props.letterSpacing && `${props.letterSpacing}px`};
  text-align: ${(props) => props.align};
  word-break: ${(props) => props.wordBreak};
`

export default function Text(props: Props) {
  const { style, ...otherProps } = props

  return <Span {...otherProps} style={{ ...style }} />
}
