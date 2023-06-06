export class Consultar {
    constructor(){
      this.load()
      this.refreshRow()
 
      
    }

    load(){

    this.dados = JSON.parse(localStorage.getItem("cadastro")) || []

    }

    refreshRow(){

      this.removeAll()
      this.card = document.querySelector(".card-principal")

    
      this.dados.forEach(element => {
        let row = this.createRow()
        row.querySelector(".nomeesobrenome").textContent = `${element.nome} ${element.sobrenome}`
        row.querySelector(".idadeano").textContent = `${element.idade} Anos`
        row.querySelector(".avatarperfil").src = `https://api.dicebear.com/6.x/open-peeps/svg?seed=${element.avatar}`
        row.querySelector(".closed").addEventListener("click", (value)=> {
          this.deteleRow(value)
        })


        this.card.append(row)

      });
      


    }

    deteleRow(value){

  
      const filter = this.dados.filter(dado => {
        return dado.nome !== value.nome

      })

      this.dados = filter
      console.log(this.dados)
      this.load()

    }
   
    removeAll(){

    document.querySelector(".card-principal").querySelectorAll(".cards").forEach(card => card.remove())

    }

    createRow(){
    const div = document.createElement("div")
   
    const html = `<i class="fa-solid fa-xmark closed"></i>
    <h2 class="nomeesobrenome">Victor Paranhos</h2>
    <p class="idadeano">28 anos</p>
    <img class="avatarperfil" src="https://api.dicebear.com/6.x/open-peeps/svg?seed=Salem" alt="foto do perfil">`
    div.setAttribute("class", "cards")

    div.innerHTML = html

    return div

    }




  }
