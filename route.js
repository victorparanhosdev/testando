

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

        if(callback == "consultas"){
          document.querySelector("#button-ok").addEventListener("click", ()=> alert("clicou"))

        
          let dados = JSON.parse(localStorage.getItem("cadastro")) || []
          let card = document.querySelector(".card-principal")
     
          for( let dado of dados){
            
            const html = `<div class="cards">
            <i class="fa-solid fa-xmark closed"></i>
            <h2 class="nomeesobrenome">${dado.nome} ${dado.sobrenome} </h2>
            <p class="idadeano">${dado.idade} anos</p>
            <img class="avatarperfil" src="https://api.dicebear.com/6.x/open-peeps/svg?seed=${dado.avatar}" alt="foto do perfil">
            </div>`
            
            card.innerHTML += html
          }

         


          



        
      


            

      
              

          

          
          
      



  
        }

        if (typeof callback === "function") {
          callback();
        }
        if (typeof callback === "number") {
          const swiper = new Swiper('.swiper', {
            // Optional parameters
            autoplay: {
              delay: 2000,
            },
            mousewheel: true,
            keyboard: true,
            loop: true,
          
            // If we need pagination
            pagination: {
              el: '.swiper-pagination',
              type: 'bullets',
            },
          
            // Navigation arrows
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          
          
          });
        }
      });
  }
}
