const Router = {
  init: () => {
    // Enhance all links with the "navlink" class
    // We want to prevent the default behavior of these links and handle navigation ourselves
    // another way to get the URL
    // const url1 = event.target.href;
    // const url = link.href;
    document.querySelectorAll('a.navlink').forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault();
        const url = link.getAttribute('href');
        Router.go(url);
      });
    });

    // Event listener for popstate to
    // handle back/forward navigation
    globalThis.addEventListener('popstate', event => {
      // we can do this Router.go(location.pathname, false);
      // also i can
      console.log('popstate event:', event);
      Router.go(event.state.route, false);
    });
    // Check the initial URL and render the correct page
    console.log('Initial URL:', location.pathname);
    Router.go(location.pathname);
  },
  go: (route, addToHistory = true) => {
    console.log(`Going to ${route}`);
    if (addToHistory) {
      history.pushState({ route }, null, route);
    }

    let pageElement = null;
    switch (route) {
      case '/':
        pageElement = document.createElement('menu-page');
        break;
      case '/order':
        pageElement = document.createElement('order-page');
        break;
      default:
        if (route.startsWith('/product-')) {
          console.log('Navigating to product details for route:', route);
          pageElement = document.createElement('details-page');
          pageElement.dataset.productId = route.substring(route.lastIndexOf('-') + 1);
        }
        break;
    }
    if (pageElement) {
      const cache = document.querySelector('main');
      // check if there is already a page rendered and remove it
      // cache.innerHTML = "";
      cache.children[0]?.remove();
      cache.appendChild(pageElement);
      window.scrollTo(0, 0);
    }
  },
};

export default Router;
