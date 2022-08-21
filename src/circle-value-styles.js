import { css } from 'lit';

export const circleValueStyles = css`
  :host {
    display: block;
    --ancho: 5px;
  }
  * {
    box-sizing: inherit;
    margin: 0;
    border: none;
    padding: 0;
    list-style: none;
    background: transparent;
    color: inherit;
    font: inherit;
  }

  .slide {
    display: grid;
  }
  .chart {
    grid-column: 1/-1;
    place-self: center;
    overflow: hidden;
    position: relative;
    padding: 27.5%;
    border-radius: 50%;
  }
  .chart::before, .chart::after, .chart .arc {
    position: absolute;
    right: 0;
    left: 0;
    line-height: 1.125;
    text-align: center;
  }
  .chart::before {
    bottom: 35%;
    font-size: 2rem;
    font-weight: 700;
    counter-reset: perc var(--perc);
    content: counter(perc);
  }
  .chart::after { 
    bottom: 38%;
    left:60%;
  }

  .arc {
    /* --a: calc(var(--rel)*360deg); */
    --a: calc(var(--rel) *1deg);
    display: grid;
    top: 0;
    bottom: 0;
    transform: rotate(calc((var(--cum) - var(--rel))*1deg));
    background: conic-gradient(var(--col) var(--a), transparent 0%);
    --mask: radial-gradient(closest-side, transparent calc(100% - calc(var(--ancho) * 2) - 1px), red calc(100% - 2em));
    -webkit-mask: var(--mask);
    mask: var(--mask);
  }
  .arc::before, .arc::after {
    grid-area: 1/1;
    border-radius: 50%;
    background: radial-gradient(circle at 50% var(--ancho), var(--col) var(--ancho), transparent calc(var(--ancho) + 1px));
    content: "";
  }
  .arc::after {
    transform: rotate(var(--a));
  }

  .total {
    grid-template-columns: 2.5em 1fr;
    background: radial-gradient(circle, var(--ll) calc(0.75em - 1px), transparent 0.75em) left 0.5em bottom 0.5em no-repeat;
    counter-reset: val var(--ssum);
  }

  .used {
    grid-template-columns: 4.75em 1fr;
    background: radial-gradient(circle, var(--col3) calc(0.75em - 1px), var(--hl) 0.75em calc(0.75em + 1px), transparent calc(0.75em + 2px)) left 0.5em bottom 0.5em, radial-gradient(circle, var(--col2) calc(0.75em - 1px), var(--hl) 0.75em calc(0.75em + 1px), transparent calc(0.75em + 2px)) left 1.25em bottom 0.5em, radial-gradient(circle, var(--col1) calc(0.75em - 1px), var(--hl) 0.75em calc(0.75em + 1px), transparent calc(0.75em + 2px)) left 2em bottom 0.5em, radial-gradient(circle, var(--col0) calc(0.75em - 1px), var(--hl) 0.75em calc(0.75em + 1px), transparent calc(0.75em + 2px)) left 2.75em bottom 0.5em;
    background-repeat: no-repeat;
    counter-reset: val var(--used);
  }

  .legend {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 4px;
    grid-row-gap: 4px;
    margin-top:0.5rem;
  }
  .legend div {
    text-align: center;
    padding: 0.2rem;
    border:0;
    border-radius: 0.25rem;
  }
  .legend h4 {
    font-size: var(--percentFontSize, 1.1rem);
    font-weight: bold;
  }
  .legend h5 {
    font-size: var(--percentFontSize, 0.8rem);
    font-weight: bold;
    color:#333;
  }

  .legend .div1 { grid-area: 1 / 1 / 2 / 2; }
  .legend .div2 { grid-area: 1 / 2 / 2 / 3; }
  .legend .div3 { grid-area: 1 / 3 / 2 / 4; }
  .legend .div4 { grid-area: 2 / 1 / 3 / 2; }
  .legend .div5 { grid-area: 2 / 2 / 3 / 3; }
  .legend .div6 { grid-area: 2 / 3 / 3 / 4; }
  .legend .div7 { grid-area: 3 / 1 / 4 / 2; }
  .legend .div8 { grid-area: 3 / 2 / 4 / 3; }
  .legend .div9 { grid-area: 3 / 3 / 4 / 4; }
`;
