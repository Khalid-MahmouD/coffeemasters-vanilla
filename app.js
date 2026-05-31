import { loadData } from "./services/Menu.js";
import Router from "./services/Router.js";
import Store from "./services/Store.js";

const testRender = () => {
  app.store.menu.map((item) => console.log(item.name));
};

globalThis.app = {};
app.store = Store;
app.router = Router;
app.testRender = testRender;

globalThis.addEventListener("DOMContentLoaded", async () => {
  await loadData();
  app.router.init(); // go all the links and enhance them
});

globalThis.addEventListener("DOMContentLoaded", () => {});
