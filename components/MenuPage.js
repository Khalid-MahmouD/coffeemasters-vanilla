import { BaseComponent } from './BaseComponent.js';

export class MenuPage extends BaseComponent {
  constructor() {
    super();
  }

  async connectedCallback() {
    await this._loadCss('/components/MenuPage.css');
    const template = document.getElementById('menu-page-template');
    this.root.appendChild(template.content.cloneNode(true));

    globalThis.addEventListener('menuUpdated', () => {
      this.render();
    });
    this.render();
  }

  async render() {
    if (app.store.menu) {
      this.root.querySelector('#menu').innerHTML = '';
      const menu = await app.store.menu;
      console.log(menu);
      for (let category of menu) {
        const liCategory = document.createElement('li');
        liCategory.innerHTML = `
          <h3>${category.name}</h3>
          <ul class='category'>
            
          </ul>
        `;
        this.root.querySelector('#menu').appendChild(liCategory);

        category.products.forEach(product => {
          const item = document.createElement('product-item');
          item.dataset.product = JSON.stringify(product);
          liCategory.querySelector('ul').appendChild(item);
        });
      }
    } else {
      this.root.querySelector('#menu').innerHTML = `<p>Loading...</p>`;
    }
  }
}

customElements.define('menu-page', MenuPage);
