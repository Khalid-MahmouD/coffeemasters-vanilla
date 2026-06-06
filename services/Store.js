const Store = {
  menu: null,
  cart: [],
};

const proxiedStore = new Proxy(Store, {
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
