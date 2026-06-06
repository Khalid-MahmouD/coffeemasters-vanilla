export class BaseComponent extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this._stylesEl = document.createElement('style');
    this.root.appendChild(this._stylesEl);
  }

  static async loadCss(url) {
    const response = await fetch(url);
    const css = await response.text();

    this._stylesEl.textContent = css;
  }

  async _loadCss(url) {
    await BaseComponent.loadCss.bind(this)(url);
  }
}
