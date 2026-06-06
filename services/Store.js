import API from './API.js';

const Store = {
  menu: null,
  cart: [],
};

const proxiedStore = new Proxy(Store, {
  get(target, property) {
    if (property === 'menu') {
      if (!target.menu) {
        target.menu = API.fetchMenu();
      }
      return target.menu;
    }
    return target[property];
  },
  set(target, property, value) {
    target[property] = value;
    if (property === 'menu') {
      globalThis.dispatchEvent(new Event('menuUpdated'));
    }
    if (property === 'cart') {
      globalThis.dispatchEvent(new Event('cartUpdated'));
    }
    return true;
  },
});
export default proxiedStore;
