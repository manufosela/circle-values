import { html, LitElement } from 'lit';
import { circleValueStyles } from './circle-value-styles.js';

export class CircleValues extends LitElement {
  static get styles() {
    return [circleValueStyles]
  }

  static get properties() {
    return {
      width: { type: String },
      totalValue: { type: String },
      units: { type: String },
      hideLegend: { type: Boolean, attribute: 'hide-legend' },
      arcWidth: { type: String, attribute: 'arc-width' },
    };
  }

  constructor() {
    super();
    this.width = '200px';
    this.arcWidth = '5px';
    this.totalValue = 0;
    this.units = '%';
    this.acumDegs = 0;
    this.totalValue = 0;
    this.hideLegend = false;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  _calculateTotalValue(values) {
    values.forEach(value => {
      this.totalValue += parseInt(value.getAttribute('value'), 10);
    });
    // console.log(`totalValue: ${this.totalValue}`);
  }

  _drawChart(values, chart) {
    values.forEach(value => {
      const div = document.createElement('div');
      const val = parseInt(value.getAttribute('value'), 10);
      const degPercent = (val * 360 / this.totalValue);
      this.acumDegs += degPercent;
      div.className = 'arc';
      div.style = `--cum: ${this.acumDegs}; --rel: ${degPercent}; --col: ${value.getAttribute('color')};`;
      chart.appendChild(div);
      // console.log(`grados %: ${degPercent}`);
    });
    // console.log(`grados acumulados: ${this.acumDegs}`);
  }

  _drawLegend(values) {
    const legend = this.shadowRoot.querySelector('.legend');
    legend.innerHTML = '';
    values.forEach((value, index) => {
      const val = value.getAttribute('value');
      const valPercent = parseInt(val * 10000 / this.totalValue, 10) / 100;
      const div = document.createElement('div');
      div.className = `div${index + 1}`;
      div.style = `background: ${value.getAttribute('color')};`;
      div.innerHTML = `<h4>${value.getAttribute('title')}:</h4> ${val}${this.units} ${(this.units !== '%') ? `<h5>(${valPercent}%)</h5>` : ''}`;
      legend.appendChild(div);
    });
  }

  firstUpdated() {
    const values = [...this.querySelectorAll('circle-value')];
    const chart = this.shadowRoot.querySelector('.chart');
    this._calculateTotalValue(values);
    this._drawChart(values, chart);
    if (!this.hideLegend) {
      this._drawLegend(values);
    }
  }

  render() {
    return html`
      <style>* { --ancho: ${this.arcWidth} } .chart::after { content: "${this.units}"; }</style>
      <div style="--mode:${this.mode}; --perc: ${this.totalValue}; width:${this.width};" class="slide">
        <div class="chart"></div>
      </div>
      <div class="legend" style="width:${this.width}"></div>
    `;
  }
}
