import { getProductById } from '../services/Menu.js';
import { addToCart } from '../services/Order.js';
import { BaseComponent } from './BaseComponent.js';
export default class DetailsPage extends BaseComponent {
  async connectedCallback() {
    await this._loadCss('/components/DetailsPage.css');
    const template = document.getElementById('details-page-template');
    this.root.appendChild(template.content.cloneNode(true));

    this.renderData();
  }

  async renderData() {
    if (this.dataset.id) {
      this.product = await getProductById(this.dataset.id);
      console.log(this.product);
      this.root.querySelector('h2').textContent = this.product.name;
      this.root.querySelector('img').src = `/data/images/${this.product.image}`;
      this.root.querySelector('.description').textContent = this.product.description;
      this.root.querySelector('.price').textContent = `$ ${this.product.price.toFixed(2)} ea`;
      this.root.querySelector('button').addEventListener('click', () => {
        addToCart(this.product.id);
        app.router.go('/order');
      });
    } else {
      alert('Invalid Product ID');
    }
  }
}

customElements.define('details-page', DetailsPage);
