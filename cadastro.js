export class CadastroUser {
  
    constructor() {
      this.Botoes = {
        Menu: document.querySelector(".menu"),
        MenuHamburguer: document.querySelector(".menu-hamburguer"),
        BotaoClose: document.querySelector("i.menu-close"),
        BotaoOpen: document.querySelector("i.menu-open"),
        links: document.querySelectorAll(".menu ul li a"),
        resultado: document.querySelector(".resultado-1"),
        resultado2: document.querySelector(".resultado-2"),
        resultado3: document.querySelector(".resultado-3"),
        confirm: document.querySelector("#confirm"),
        resetar: document.querySelector("#resetar"),
        adicionar: document.querySelector("#adicionar"),
        apagar: document.querySelector("#apagar"),
      };
  
      this.boxInput = {
        name: document.querySelector("#name"),
        sobrenome: document.querySelector("#sobrenome"),
        idade: document.querySelector("#idade"),
        opcaodados: document.querySelector(".opcaodados"),
      };
  
      this.load();
      this.save();
      this.adicionar();
      this.clicks();
    }
  
    load() {
      this.dados = JSON.parse(localStorage.getItem("cadastro")) || [];
    }
  
    save() {
      this.Botoes.confirm.addEventListener("click", (event) => {
        event.preventDefault();
  
        let isNotOption =
          this.boxInput.opcaodados.querySelector("option") == null;
  
        if (isNotOption) {
          alert("Por favor preencha os dados");
          return;
        }
  
        let isOk = confirm("Os dados estao corretos?");
  
        if (isOk) {
          localStorage.setItem("cadastro", JSON.stringify(this.dados));
  
          this.boxInput.opcaodados
            .querySelectorAll("option")
            .forEach((option) => option.remove());
          alert("Salvo com Sucesso");
          this.LimparConteudo();
        }
      });
    }
  
    adicionar() {
      this.Botoes.adicionar.addEventListener("click", (event) => {
        event.preventDefault();
        let verificar =
          this.boxInput.name.value === "" ||
          this.boxInput.sobrenome.value === "" ||
          this.boxInput.idade.value === "";
  
        if (verificar) {
          alert("Por favor preencha os dados");
          return;
        }
  
        const dadosManipulados = {
          nome: this.boxInput.name.value,
          sobrenome: this.boxInput.sobrenome.value,
          idade: this.boxInput.idade.value,
        };
  
        this.dados.push(dadosManipulados);
  
        let opcao = document.createElement("option");
        const html = `Nome Completo: ${dadosManipulados.nome} ${dadosManipulados.sobrenome}/Idade: ${dadosManipulados.idade} anos`;
        opcao.textContent = html;
  
        this.boxInput.opcaodados.appendChild(opcao);
        this.LimparConteudo();
        this.boxInput.name.focus();
      });
    }
  
    clicks() {
      this.Botoes.BotaoOpen.addEventListener("click", () => {
        this.Botoes.MenuHamburguer.classList.toggle("active");
        this.Botoes.Menu.classList.toggle("active");
      });
  
      this.Botoes.BotaoClose.addEventListener("click", () => {
        this.Botoes.MenuHamburguer.classList.toggle("active");
        this.Botoes.Menu.classList.toggle("active");
      });
  
      this.Botoes.links.forEach(
        (link) =>
          (link.onclick = (event) => {
            event.preventDefault();
            this.Botoes.Menu.classList.remove("active");
            this.Botoes.MenuHamburguer.classList.remove("active");
          })
      );
      this.boxInput.idade.addEventListener("input", (event) => {
        this.Botoes.resultado3.textContent = event.target.value;
      });
  
      this.boxInput.name.addEventListener("input", (event) => {
        this.Botoes.resultado.textContent = event.target.value;
      });
  
      this.boxInput.sobrenome.addEventListener("input", (event) => {
        this.Botoes.resultado2.textContent = event.target.value;
      });
  
      this.Botoes.resetar.onclick = () => this.LimparConteudo();
  
      this.Botoes.apagar.onclick = () => {
        this.boxInput.opcaodados.querySelector("option:last-child").remove();
        this.dados.pop();
      };
    }
  
    LimparConteudo() {
      this.boxInput.idade.value = "";
      this.boxInput.sobrenome.value = "";
      this.Botoes.resultado.textContent = "";
      this.Botoes.resultado2.textContent = "";
      this.Botoes.resultado3.textContent = "";
      this.boxInput.name.value = "";
    }
}


new CadastroUser()