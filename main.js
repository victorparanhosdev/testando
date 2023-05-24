
import { Router } from "./route.js";

const router = new Router();

router.add("/", "/pages/inicio.html");
router.add("/cadastro", "/pages/cadastro.html");
router.add("/consultas", "/pages/consultas.html");
router.add("/contatos", "/pages/contatos.html");


router.handle()
window.route = () => router.route()
window.onpopstate = () => router.route();


