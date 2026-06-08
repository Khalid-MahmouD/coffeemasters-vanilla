import { getProductById } from './Menu.js';

export async function addToCart(id) {
  const product = await getProductById(id);
  const results = app.store.cart.filter(prodInCart => prodInCart.product.id == id);
  if (results.length > 0) {
    app.store.cart = app.store.cart.map(item =>
      item.product.id === id ? { ...item, quantity: item.quantity + 1 } : item,
    );
  } else {
    // this will not trigger the cartUpdated event because we are mutating the array, we need to create a new array to trigger the event
    // app.store.cart.push({
    //   id: product.id,
    //   name: product.name,
    //   price: product.price,
    //   quantity: 1,
    // });

    app.store.cart = [...app.store.cart, { product, quantity: 1 }];
  }
}

export async function removeFromCart(id) {
  app.store.cart = app.store.cart.filter(item => item.product.id !== id);
}
