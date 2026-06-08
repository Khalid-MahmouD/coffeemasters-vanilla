import { MenuPage } from './components/MenuPage.js';
import { OrderPage } from './components/OrderPage.js';
import ProductItem from './components/ProductItem.js';
import Router from './services/Router.js';
import Store from './services/Store.js';
import DetailsPage from './components/detialsPage.js';
import CartItem from './components/CartItem.js';
const testRender = () => {
  app.store.menu.map(item => console.log(item.name));
};

globalThis.app = {};
app.store = Store;
app.router = Router;
app.testRender = testRender;

globalThis.addEventListener('DOMContentLoaded', async () => {
  app.router.init();
});

globalThis.addEventListener('DOMContentLoaded', () => {});

globalThis.addEventListener('cartUpdated', () => {
  const badge = document.getElementById('badge');
  const qty = app.store.cart.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);
  badge.textContent = qty;
  badge.hidden = qty === 0;
});
