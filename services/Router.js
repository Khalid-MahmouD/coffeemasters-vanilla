const Router = {
  init: () => {
    // Enhance all links with the "navlink" class
    // We want to prevent the default behavior of these links and handle navigation ourselves
    document.querySelectorAll("a.navlink").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        // const url1 = event.target.href;
        // const url = link.href;
        const url = link.getAttribute("href");
        Router.go(url);
      });
    });
    // Check the initial URL and render the correct page
    Router.go(location.pathname);
  },
  go: (route, addToHistory = true) => {
    console.log(`Going to ${route}`);
    if (addToHistory) {
      history.pushState({ route }, null, route);
    }

    let pageElement = null;
    switch (route) {
      case "/":
        pageElement = document.createElement("h1");
        pageElement.textContent = "Menu";
        break;
      case "/order":
        pageElement = document.createElement("h1");
        pageElement.textContent = "Order";
        break;
    }
    document.querySelector("main").appendChild(pageElement);
  },
};

export default Router;
