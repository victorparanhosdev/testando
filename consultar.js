export class Consultar {
    constructor(){
      this.load()
      this.refreshRow()

  
      
    }

    load(){

    this.dados = JSON.parse(localStorage.getItem("cadastro")) || []

    }
    save(){
      localStorage.setItem("cadastro", JSON.stringify(this.dados))
      this.refreshRow()
    }

    refreshRow(){

      this.removeAll()
      
      this.card = document.querySelector(".card-principal")
 
      let tamanho = this.card.querySelectorAll("div:has(div.empty) .empty")
   
        if(tamanho.length == 0){

          this.card.append(this.CreatemptyRow())
          return
    

        }else {
          this.removeEmptyRow()
          this.dados.forEach(element => {
            let row = this.createRow()
            row.querySelector(".nomeesobrenome").textContent = `${element.nome} ${element.sobrenome}`
            row.querySelector(".idadeano").textContent = `${element.idade} Anos`
            row.querySelector(".avatarperfil").src = `https://api.dicebear.com/6.x/open-peeps/svg?seed=${element.avatar}`
            row.querySelector(".closed").addEventListener("click", ()=> {
              this.deteleRow(element)
        
            })
            this.card.append(row)
    
          });
        }
 

     
      


    }

    deteleRow(valor){
      let isOk = confirm("Deseja Excluir ?")


     if(isOk){

      const filter = this.dados.filter(dado => {
        return (dado.nome && dado.sobrenome) !== (valor.nome && valor.sobrenome)
      })
      this.dados = filter

     }
      
      this.save()
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
   removeEmptyRow(){
    document.querySelector(".card-principal").querySelectorAll("div:has(div.empty) .empty").forEach(card => card.remove())
   }
    CreatemptyRow(){


      const div = document.createElement('div')
      div.innerHTML = `<h1>Vazio</h1>`
      div.classList.add("empty")
      
      
      return div
      
    }




  }
