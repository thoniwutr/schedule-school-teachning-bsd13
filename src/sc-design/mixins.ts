import { css } from 'styled-components'
import { Colors } from './colors'

export const input = () => css`
  height: 40px;
  padding: 7px 11px;
  font-size: 1rem;
  font-family: Assistant;
  border-radius: 4px;
  border: 1px solid #b5b5b5;
  transition: all 0.1s ease-in;

  &::placeholder {
    color: #b5b5b5;
  }

  &:disabled {
    color: darkgrey;
  }

  &:focus {
    border-width: 2px;
    border-color: ${Colors['$c-blue3']};
  }
`

export const label = () => css`
  font-size: 0.875rem;
  font-family: Assistant;
  color: ${Colors.inputLabel};
`
