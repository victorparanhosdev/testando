export class Router {

  routes = {};
  
  add(routeName, page, funcao) {
    this.routes[routeName] = page;

    if (funcao) {
      this.routes[routeName] = [page, funcao];
    }
  }

  route(event) {
    event = event || window.event;
    event.preventDefault();

    window.history.pushState({}, "", event.target.href);

    this.handle();
  }

  handle() {
    const { pathname } = window.location;
    let route = this.routes[pathname] || this.routes["/"];

    let callback = null;

    if (Array.isArray(route)) {
      let [n1, n2] = route;
      route = n1;
      callback = n2;
    }

    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        document.querySelector("#app").innerHTML = html;

        if (typeof callback === "function") {
          callback();
        }
      });
  }
}
