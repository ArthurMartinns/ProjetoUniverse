function route(event) {
  event = event || window.event;
  event.preventDefault();

  window.history.pushState({}, "", event.target.href);

  handle();
}

const routes = {
  "/": "/pages/home.html",
  "/universo": "/pages/universo.html",
  "/exploracao": "/pages/exploracao.html",
  "/404": "/pages/404.html" 
};

function handle() {
  const { pathname } = window.location;
  const route = routes[pathname] || routes["/404"];

  fetch(route)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao carregar a página");
      }
      return response.text();
    })
    .then((html) => {
      document.querySelector("#app").innerHTML = html;
    })
    .catch((error) => {
      console.error(error);
      window.location.href = routes["/404"];
    });
}

handle();
window.onpopstate = handle();
window.route = route();