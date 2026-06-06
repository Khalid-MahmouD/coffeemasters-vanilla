import { loadData } from './services/Menu.js';
import { MenuPage } from './components/MenuPage.js';
import { OrderPage } from './components/OrderPage.js';
import productItem from './components/ProducItem.js';
import Router from './services/Router.js';
import Store from './services/Store.js';
import DetailsPage from './components/detialsPage.js';

const testRender = () => {
  app.store.menu.map(item => console.log(item.name));
};

globalThis.app = {};
app.store = Store;
app.router = Router;
app.testRender = testRender;

globalThis.addEventListener('DOMContentLoaded', async () => {
  app.router.init();
  await loadData();
});

globalThis.addEventListener('DOMContentLoaded', () => {});
