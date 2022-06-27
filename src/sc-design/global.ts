import { createGlobalStyle, css } from 'styled-components'

function resetCSS() {
  return css`
    // Ref: http://meyerweb.com/eric/tools/css/reset/
    html,
    body,
    div,
    span,
    applet,
    object,
    iframe,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    pre,
    a,
    abbr,
    acronym,
    address,
    big,
    cite,
    code,
    del,
    dfn,
    em,
    img,
    ins,
    kbd,
    q,
    s,
    samp,
    small,
    strike,
    strong,
    sub,
    sup,
    tt,
    var,
    b,
    u,
    i,
    center,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    legend,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    article,
    aside,
    canvas,
    details,
    embed,
    figure,
    figcaption,
    footer,
    header,
    hgroup,
    menu,
    nav,
    output,
    ruby,
    section,
    summary,
    time,
    mark,
    audio,
    video {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font: inherit;
      vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section {
      display: block;
    }
    body {
      line-height: 1;
    }
    ol,
    ul {
      list-style: none;
    }
    blockquote,
    q {
      quotes: none;
    }
    blockquote:before,
    blockquote:after,
    q:before,
    q:after {
      content: '';
      content: none;
    }
    table {
      border-collapse: collapse;
      border-spacing: 0;
    }

    // Ref: https://www.joshwcomeau.com/css/custom-css-reset/
    /* 1. Use a more-intuitive box-sizing model */
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }
    /* 2. Remove default margin */
    * {
      margin: 0;
    }
    /* 3. Allow percentage-based heights in the application */
    html,
    body,
    #root {
      height: 100%;
    }
    /*
        Typographic tweaks!
        4. Add accessible line-height
        5. Improve text rendering
    */
    body {
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
    }
    /* 6. Improve media defaults */
    img,
    picture,
    video,
    canvas,
    svg {
      display: block;
      max-width: 100%;
    }
    /* 7. Remove built-in form typography style */
    input,
    button,
    textarea,
    select {
      font: inherit;
    }
    /* 8. Avoid text overflows */
    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      overflow-wrap: break-word;
    }
    /* 9. Create a root stacking context */
    #root {
      isolation: isolate;
    }
  `
}

const GlobalStyle = createGlobalStyle`
${resetCSS()}

@font-face {
  font-family: 'LexendDeca';
  src: url('/fonts/LexendDeca-Regular.ttf');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Assistant';
  src: url('/fonts/Assistant-ExtraLight.ttf');
  font-weight: 200;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Assistant';
  src: url('/fonts/Assistant-Light.ttf');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Assistant';
  src: url('/fonts/Assistant-Regular.ttf');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Assistant';
  src: url('/fonts/Assistant-Medium.ttf');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Assistant';
  src: url('/fonts/Assistant-SemiBold.ttf');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Assistant';
  src: url('/fonts/Assistant-Bold.ttf');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Assistant';
  src: url('/fonts/Assistant-ExtraBold.ttf');
  font-weight: 800;
  font-style: normal;
  font-display: swap;
} 

html,
body,
input, 
button {
  font-family: LexendDeca, Arial, sans-serif;
}

.collapsed {
  display: none;
}
`

export default GlobalStyle
