class CadastroUser {
  constructor() {
    this.Botoes = {
      resultado: document.querySelector(".resultado-1"),
      resultado2: document.querySelector(".resultado-2"),
      resultado3: document.querySelector(".resultado-3"),
      resultado4: document.querySelector(".resultado-4"),
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
      selectavatar: document.querySelector("#select-avatar"),
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
        this.boxInput.opcaodados.querySelector("li") == null;

      if (isNotOption) {
        alert("Por favor preencha os dados");
        return;
      }

      let isOk = confirm("Os dados estao corretos?");

      if (isOk) {
        localStorage.setItem("cadastro", JSON.stringify(this.dados));

        this.boxInput.opcaodados
          .querySelectorAll("li")
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
        avatar: this.boxInput.selectavatar.value
      };

      this.dados.push(dadosManipulados);

      let opcao = document.createElement("li");
      const html = `Nome Completo: ${dadosManipulados.nome} ${dadosManipulados.sobrenome}/Idade: ${dadosManipulados.idade} anos, Avatar: ${dadosManipulados.avatar}`;
      opcao.textContent = html;

      this.boxInput.opcaodados.appendChild(opcao);
      this.LimparConteudo();
      this.boxInput.name.focus();
    });
  }

  clicks() {
    this.boxInput.idade.addEventListener("input", (event) => {
      this.Botoes.resultado3.textContent = event.target.value;
    });
    this.boxInput.selectavatar.addEventListener("input", (event) => {
      this.Botoes.resultado4.textContent = event.target.value;
    });

    this.boxInput.name.addEventListener("input", (event) => {
      this.Botoes.resultado.textContent = event.target.value;
    });

    this.boxInput.sobrenome.addEventListener("input", (event) => {
      this.Botoes.resultado2.textContent = event.target.value;
    });

    this.Botoes.resetar.onclick = () => this.LimparConteudo();

    this.Botoes.apagar.onclick = () => {
      this.boxInput.opcaodados.querySelector("li:last-child").remove();
      this.dados.pop();
    };
  }

  LimparConteudo() {
    this.boxInput.idade.value = "";
    this.boxInput.sobrenome.value = "";
    this.Botoes.resultado.textContent = "";
    this.Botoes.resultado2.textContent = "";
    this.Botoes.resultado3.textContent = "";
    this.Botoes.resultado4.textContent = "";
    this.boxInput.name.value = "";
  }
}

export default CadastroUser

