
export class Consultar {
  
  constructor() {
    this.load();
    this.refreshRow();
    this.filtrar();
   

  }

  load() {
    this.dados = JSON.parse(localStorage.getItem("cadastro")) || [];
  }
  save() {
    localStorage.setItem("cadastro", JSON.stringify(this.dados));
    this.refreshRow()
    
  }

  refreshRow() {
    
    const tamanho = this.dados;
    let imagemrandomica = ['nature', 'architecture', 'food', 'people', 'technology']
    let random = Math.floor(Math.random() * imagemrandomica.length)
   

    this.removeAll();
    this.removeEmptyAll();
    this.card = document.querySelector(".card-principal");

   
    if (tamanho.length == 0) {
      this.card.append(this.CreatemptyRow());
      return;
    } else {
      this.dados.forEach((element) => {
        let row = this.createRow();
        row.querySelector(
          ".nomeesobrenome"
        ).textContent = `${element.nome} ${element.sobrenome}`;
        row.querySelector(".idadeano").textContent = `${element.idade} Anos`;
        row.querySelector(
          ".avatarperfil"
        ).src = `https://api.dicebear.com/6.x/open-peeps/svg?seed=${element.avatar}`;
        row.querySelector(".img-random").src = `https://source.unsplash.com/200x320/?${imagemrandomica[random]}`

        row.querySelector(".closed").addEventListener("click", () => {
          this.deteleRow(element);
        });
        this.card.append(row);
      });
    }
  }

  deteleRow(valor) {
    let isOk = confirm("Deseja Excluir ?");

    if (isOk) {
      const filter = this.dados.filter((dado) => {
        return (
          (dado.nome && dado.sobrenome) !== (valor.nome && valor.sobrenome)
        );
      });


      this.dados = filter;
    }
      this.save();
      this.load();
      this.filtrar();
    
   
    
  }
  removeEmptyAll() {
    document
      .querySelector(".card-principal")
      .querySelectorAll(".empty")
      .forEach((card) => card.remove());
  }
  removeAll() {
    document
      .querySelector(".card-principal")
      .querySelectorAll(".cards")
      .forEach((card) => card.remove());
  }

  createRow() {
    const div = document.createElement("div");

    const html = `<div class="cards-1">
    <i class="fa-solid fa-xmark closed"></i>
    <h2 class="nomeesobrenome">Victor Paranhos</h2>
    <p class="idadeano">28 anos</p>
    <img class="avatarperfil" src="https://api.dicebear.com/6.x/open-peeps/svg?seed=Salem" alt="foto do perfil">
    </div>
    <div class="cards-2">
    <img class="img-random" src="https://source.unsplash.com/200x320/?airplane" alt="foto">
    </div>`;
    div.setAttribute("class", "cards")

    div.innerHTML = html;

    return div;
  }

  CreatemptyRow() {
    const div = document.createElement("div");
    div.innerHTML = `<h1>Vazio</h1>`;
    div.classList.add("empty");

    return div;
  }



  filtrar() {
    const input = document.querySelector('#consultando')

    const cards = document.querySelectorAll('.cards')
    let arraynew = Array.from(cards)

    function verificarseExisteClasse(array, classe){
      return array.some(item => item.classList.contains(classe));
      }

      arraynew.forEach(card => {

        card.addEventListener("click", (event)=> {

    
        
          if(!verificarseExisteClasse(arraynew, 'virar')){
          
      
            card.classList.add("virar")

            return

          }

          if(event.currentTarget.classList.contains("virar")){
            
            card.classList.remove("virar")
        
          }else {
            arraynew.forEach(carde=> {
              carde.classList.remove("virar")
            })

            if(!event.currentTarget.classList.contains("virar")){
              card.classList.add("virar")
          
        
              
            }

          }
          
          
        })

      
      })
     

      


      input.addEventListener("input", () => {
      const cards = document.querySelectorAll('.cards')

    
      const valor = input.value.toLowerCase()
      
     for (let card of cards) {

        if (input == '') {
        card.style.display = 'block'
        } else {
          let title = card.querySelector(".nomeesobrenome").textContent.toLowerCase()
          if (title.includes(valor)) {
           card.style.display = "block"
            
            if(document.querySelector(".card-principal").classList.contains("empty")){
              document.querySelector(".card-principal").classList.remove("empty")
            }
            card.style.display = "block"

          } else {
            card.style.display = "none"   

            if(Array.from(cards).every(cardo => cardo.style.display === 'none')){
              document.querySelector(".card-principal").classList.add("empty")

            }

          }


        }

        

      }

  
     
          

    })

  }


}



