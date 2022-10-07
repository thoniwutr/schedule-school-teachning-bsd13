export const Colors = {
  // Primary Colours
  '$c-blue1': '#000b3c',
  '$c-blue2': '#142ab4',
  '$c-blue3': '#2c46b5',
  '$c-blue4': '#5071ff',
  '$c-blue5': '#08154D',
  //  Secondary Colours
  white: 'white',
  black: 'black',
  red: '#f65129',
  yellow: '#ffd74f',
  green: '#03a05d',
  gray: '#cbcbcb',
  // TODO: Remove this
  '#cbcbcb': '#cbcbcb',

  // Not in the system-design  🤷🏻‍♂️
  activeNavbar: '#00d379',
  inputLabel: '#888888',
  uncheckedSwitch: '#9f9f9f',
  tableText: '#6c6c6c',
} as const

export type Color = keyof typeof Colors
