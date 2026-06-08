import { BaseComponent } from './BaseComponent.js';
export class OrderPage extends BaseComponent {
  #user = {
    name: '',
    email: '',
    phone: '',
  };
  constructor() {
    super();
    const section = document.createElement('section');
    this.root.appendChild(section);
  }
  async connectedCallback() {
    await this._loadCss('./components/OrderPage.css');
    globalThis.addEventListener('cartUpdated', () => {
      this.render();
    });
    this.render();
  }

  render() {
    // is the shadow DOM

    let section = this.root.querySelector('section');
    if (app.store.cart.length == 0) {
      section.innerHTML = `
          <p class="empty">Your order is empty</p>
      `;
    } else {
      let html = `
          <h2>Your Order</h2>
          <ul>
          </ul>
      `;
      section.innerHTML = html;

      const template = document.getElementById('order-form-template');
      const content = template.content.cloneNode(true);
      section.appendChild(content);

      let total = 0;
      for (let prodInCart of app.store.cart) {
        const item = document.createElement('cart-item');
        item.dataset.item = JSON.stringify(prodInCart);
        this.root.querySelector('ul').appendChild(item);

        total += prodInCart.quantity * prodInCart.product.price;
      }
      this.root.querySelector('ul').innerHTML += `
            <li>
                <p class='total'>Total</p>
                <p class='price-total'>$${total.toFixed(2)}</p>
            </li>                
        `;
    }
    this.setFormBindings(this.root.querySelector('form'));
  }
  setFormBindings(form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      alert(
        `Order placed for ${this.#user.name} with email ${this.#user.email} and phone ${this.#user.phone}`,
      );
      this.#user.phone = '';
      this.#user.email = '';
      this.#user.name = '';
    });
    // set double data binding for the form inputs
    // proxy ?
    this.#user = new Proxy(this.#user, {
      set: (target, property, value) => {
        target[property] = value;
        form.elements[property].value = value;
        return true;
      },
    });

    Array.from(form.elements).forEach(element => {
      element.addEventListener('change', event => {
        this.#user[element.name] = element.value;
      });
    });
  }
}
customElements.define('order-page', OrderPage);
