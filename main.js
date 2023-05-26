import { Router } from "./route.js";
import Cadastro from "./cadastro.js"
const router = new Router();


router.add("/", "/pages/inicio.html");
router.add("/cadastro", "/pages/cadastro.html", ()=> {
  new Cadastro()
});
router.add("/consultas", "/pages/consultas.html");
router.add("/contatos", "/pages/contatos.html");

router.handle();
window.route = () => router.route();
window.onpopstate = () => router.route();


const BotoesMenu = {
  Menu: document.querySelector(".menu"),
  MenuHamburguer: document.querySelector(".menu-hamburguer"),
  BotaoClose: document.querySelector("i.menu-close"),
  BotaoOpen: document.querySelector("i.menu-open"),
  links: document.querySelectorAll(".menu ul li a"),
};

BotoesMenu.BotaoOpen.addEventListener("click", () => {
  BotoesMenu.MenuHamburguer.classList.toggle("active");
  BotoesMenu.Menu.classList.toggle("active");
});

BotoesMenu.BotaoClose.addEventListener("click", () => {
  BotoesMenu.MenuHamburguer.classList.toggle("active");
  BotoesMenu.Menu.classList.toggle("active");
});

BotoesMenu.links.forEach(link => link.addEventListener("click", (event) => {
  event.preventDefault()
  BotoesMenu.Menu.classList.remove("active")
  BotoesMenu.MenuHamburguer.classList.remove("active");
}));
