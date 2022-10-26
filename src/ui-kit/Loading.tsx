import styled from 'styled-components'
import { Color, Colors } from '../sc-design/colors'


type Props = {
  width?: number
  height?: number
  color?: Color
}

const Wrapper = styled.span<{ color: string }>`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    border-width: 3px;
    border-style: solid;
    border-color: ${(props) =>
    `${props.color} transparent transparent transparent`};
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  }

  div:nth-child(1) {
    animation-delay: -0.45s;
  }

  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export const LoadingWrapper = styled.div`
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  transform: -webkit-translate(-50%, -50%);
  transform: -moz-translate(-50%, -50%);
  transform: -ms-translate(-50%, -50%);
`

export default function Loading(props: Props) {
  return (
    <Wrapper
      style={{ width: props.width, height: props.height }}
      color={props.color ? Colors[props.color] : Colors.white}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Wrapper>
  )
}
