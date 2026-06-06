export async function getProductById(id) {
  const menu = await app.store.menu;
  for (let category of menu) {
    for (let product of category.products) {
      if (product.id == id) {
        return product;
      }
    }
  }
  return null;
}
