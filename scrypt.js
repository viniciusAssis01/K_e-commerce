

let menuTodos= document.querySelector(".todos");
let menuAcessorios= document.querySelector(".acessorios");
let menuCalçados= document.querySelector(".calçados");
let menuCamisetas= document.querySelector(".camisetas");

const input = document.querySelector("input");

const botãoInput= document.querySelector(".buttonInput")

let arrayPesquisa= []
let arrayCamisetas=[];
let arrayAcessorios=[];
let arrayCalçados=[];

const sectionVitrine= document.querySelector("section.vitrine")
//essa função cria todos os cards do array data, com base no array passado como parametro
function criarCardVitrine(arrayEspecifico){
  let idButtonCard=1
  for(let i=0;i<arrayEspecifico.length; i++){
      objeto=arrayEspecifico[i]
      const divCardVitrine = document.createElement("div")
      divCardVitrine.classList.add("card")
          const imgCardVitrine=document.createElement("img")
          imgCardVitrine.src=objeto.img
          const divDescricaoCardVitrine = document.createElement("div")
          divDescricaoCardVitrine.classList.add("descricao")
              const tipoProduto=document.createElement("p")
              tipoProduto.classList.add("tipo")
              tipoProduto.innerText=objeto.tag
              const h3DescricaoCardVitrine= document.createElement("h3")
              h3DescricaoCardVitrine.innerText=objeto.nameItem
              const pDescri= document.createElement("p")
              pDescri.classList.add("descri")
              pDescri.innerText=objeto.description
              const valorCardVitrine=document.createElement("p")
              valorCardVitrine.classList.add("valor")
              valorCardVitrine.innerText=`R$${objeto.value.toFixed(2)}`
              const adicionarAoCarrinho= document.createElement("p")
              adicionarAoCarrinho.id=`item_${idButtonCard++}` //aqui coloquei um id no bottao do card.
              adicionarAoCarrinho.classList.add("adicionarAoCarrinho")
              adicionarAoCarrinho.innerText="Adicionar ao carrinho"

              divDescricaoCardVitrine.append(tipoProduto, h3DescricaoCardVitrine, pDescri, valorCardVitrine, adicionarAoCarrinho)
              divCardVitrine.append(imgCardVitrine, divDescricaoCardVitrine)
              sectionVitrine.append(divCardVitrine)
  }
  
  return sectionVitrine
} criarCardVitrine(data)

//cria os cords do carrinho. 
function criarCarrinho(){
  const divContainerCarrinho=document.querySelector("div.containerCarrinho")

  const ulListaCarrinho= document.createElement("ul")
  ulListaCarrinho.classList.add("listaCarrinho")

  const divBaseTabela= document.createElement("div")
  divBaseTabela.classList.add("baseTabela")
      const divlinhaQnt= document.createElement("div")
      divlinhaQnt.classList.add("linhaQnt")
          const Quantidade= document.createElement("p")
          Quantidade.innerText= "Quantidade"
          const somaQnt= document.createElement("p")
          somaQnt.id="Qntde"
      const divLinhaTotal= document.createElement("div")
      divLinhaTotal.classList.add("linhaTotal")
          const total= document.createElement("p")
          total.innerText="Total"
          const somaTotal=  document.createElement("p")
          somaTotal.id="somaTotal"
      divlinhaQnt.append(Quantidade, somaQnt)
      divLinhaTotal.append(total, somaTotal)
  divBaseTabela.append(divlinhaQnt, divLinhaTotal)

  divContainerCarrinho.append(ulListaCarrinho, divBaseTabela)

} criarCarrinho()

let botoesItensVitrine= document.querySelectorAll(".adicionarAoCarrinho")
let countQtdeCarrinho=0
let somaTotal=0
//cria o evento de clique em todos botoes no card da vitrine, e chama a função de criarCardCarrinho
//evento de clique de adicionar ao carrinho
for(let i=0; i<botoesItensVitrine.length; i++){
  let botao=botoesItensVitrine[i]// botoes é um array| botao é UM ELEMENT  desse array.

  botao.addEventListener("click", function(e){
    let idElemento= e.target.id;
    let id= parseInt(idElemento.substring(5)) 

    let item = procuraItem(id)

    let cardCarrinho = criarCardItemCarrinho(item) 
    let listaCarrinho= document.querySelector(".listaCarrinho")
    listaCarrinho.appendChild(cardCarrinho)

    countQtdeCarrinho++ 
    document.querySelector("#Qntde").innerText= countQtdeCarrinho

    somaTotal+=item.value
    document.querySelector("#somaTotal").innerText= `R$${somaTotal}`
  }) 
}

//função procura o objeto q possui o msm id q o do botão
function procuraItem(id){
  for(let i=0; i<data.length;i++){
    let item= data[i];
    if(id==item.id){
      return item
    }
  }
  return "item não encontrado"
}

//cria o card no carrinho
function criarCardItemCarrinho(item){
  const itemListaCarrinho= document.createElement("li")
  itemListaCarrinho.classList.add("cardCarrinho")
  itemListaCarrinho.id= "itemCarrinho_"+item.id

    const imgItemCarrinho= document.createElement("img")
    imgItemCarrinho.src=item.img
    imgItemCarrinho.classList.add("imgCarrinho")
    const divdescricaoItemCarrinho= document.createElement("div")
    divdescricaoItemCarrinho.classList.add("descricaoCarrinho")
                const h3descricaoCarrinho= document.createElement("h3")
                h3descricaoCarrinho.innerText= item.nameItem
                const valorItemNoCarrinho= document.createElement("p")
                valorItemNoCarrinho.classList.add("valor")
                valorItemNoCarrinho.innerText= `R$${item.value.toFixed(2)}`
                
                const removerDoCarrinho= document.createElement("p")
                removerDoCarrinho.classList.add("removerDoCarrinho")
                removerDoCarrinho.innerText="Remover item do carrinho"
                removerDoCarrinho.id= "remCarrinho_"+item.id
    
    divdescricaoItemCarrinho.append(h3descricaoCarrinho , valorItemNoCarrinho, removerDoCarrinho)
    itemListaCarrinho.append(imgItemCarrinho, divdescricaoItemCarrinho)

    removerDoCarrinho.addEventListener("click", function(e){
        itemListaCarrinho.remove()

        countQtdeCarrinho--
      document.querySelector("#Qntde").innerText= countQtdeCarrinho

    
    somaTotal-=item.value
    document.querySelector("#somaTotal").innerText= `R$${somaTotal}`
    })
  return itemListaCarrinho  
}


//esse separa os cards por tipo de produto, em seus respectivos array. filtro menu
//coloca em array filtrado
function criarCardsporTipo(lista){
  for (let i=0; i<lista.length; i++){
    let objeto=lista[i]
    if(objeto.tag[0] =="Camisetas"){
      arrayCamisetas.push(objeto);
    }

    if(objeto.tag[0] =="Acessórios"){
      arrayAcessorios.push(objeto);
    }

    if(objeto.tag[0] =="Calçados"){
      arrayCalçados.push(objeto);
    }

  }

  return{arrayCamisetas, arrayAcessorios, arrayCalçados}
  //colocou entre chaves pq o return só retorna um elemento
  //entre chaves conseguimos retornar mais de um elemento 
  
}//console.log(criarCardsporTipo(data))


//evento de clique da pesquisa
botãoInput.addEventListener("click", function(e){
  for(let i=0; i<data.length; i++){
    let objeto = data[i];
    let valorMinusculo= input.value.toLowerCase()
    let tagMinusculo= objeto.tag[0].toLowerCase()
    let Minusculo= objeto.nameItem.toLowerCase()
    if(valorMinusculo == tagMinusculo || valorMinusculo == Minusculo){
      arrayPesquisa.push(objeto);
      
    }
  }
  sectionVitrine.innerHTML = ""
  criarCardVitrine(arrayPesquisa)
})

//evento de clique dos filtros atraves do menu
menuTodos.addEventListener("click", function(e){
  sectionVitrine.innerHTML = ""
  criarCardVitrine(data)
})

//evento de clique dos filtros atraves do menu
menuAcessorios.addEventListener("click",function(e) {
  sectionVitrine.innerHTML = ""
  criarCardVitrine(arrayAcessorios)
})

//evento de clique dos filtros atraves do menu
menuCalçados.addEventListener("click", function(e){
  sectionVitrine.innerHTML = ""
  criarCardVitrine(arrayCalçados)
})

//evento de clique dos filtros atraves do menu
menuCamisetas.addEventListener("click", function(e){
  sectionVitrine.innerHTML = ""
  criarCardVitrine(arrayCamisetas)
})



{/* <div class="containerCarrinho">
                <ul class="listaCarrinho">
                    <li class="cardCarrinho">
                        <img src="img/camiseta_branca.svg" class="imgCarrinho">
                        <div class="descricaoCarrinho">
                            <h3>uva</h3>
                            <p class="valor">valor</p>
                            <p class="removerDoCarrinho">Remover do carrinho</p>
                        </div>
                    </li>
                </ul>

                <div class="baseTabela">
                    <div class="linhaQnt">
                        <p>Quantidade</p>
                        <p>soma</p>
                    </div>
                    <div class="linhaTotal">
                        <p>Total</p>
                        <p>soma</p>
                    </div>
                </div>

</div> */}

{/*
    id: 1,
    img: "",
    nameItem: "Lightweight Jacket",
    description:
      "Adicione um pouco de energia ao seu guarda-roupa de inverno com esta jaqueta vibrante...",
    value: 100,
    addCart: "Adicionar ao carrinho",
    tag: ["Camisetas"],
*/} 

{/* <div class="card">
        <img src="img/camiseta_preta.svg" alt="">
        <div class="descricao">
            <p class="tipo">camiseta</p>
            <h3>nome do Item</h3>
            <p class="descri">adicione um pouco de energia ao seu guarda-roupa de inverno com esta jaqueta vibrante...</p>
            <p class="valor">valor</p>
            <p class="adicionarAoCarrinho">Adicionar ao carrinho</p>
        </div>
</div> */}