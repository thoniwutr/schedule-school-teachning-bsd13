import styled from 'styled-components'
import { label } from '../sc-design/mixins'

const Label = styled.label<{ marginBottom?: string }>`
  ${label()}
  display: ${(props) => props.marginBottom && 'inline-block'};
  margin-bottom: ${(props) => props.marginBottom};
`

export default Label
