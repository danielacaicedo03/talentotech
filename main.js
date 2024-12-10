const e = require("express");

const pokemonList = document.getElementById("pokemonList");
const pokemonDetail = document.getElementById ("pokemonDetail");
const pokemonInfo = document.getElementById("pokemonInfo");
const backBtn = document.getElementById("backBtn");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
let query ="";

//función que consulta la api de pokeapi
async function fetchPokemonData(pokemonId) {
    console.log(pokemonId)
    let endpoint=`https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    const response = await fetch(endpoint);
    const pokemon = await response.json();
    console.log(pokemon)
    return pokemon;
}
function displayPokemon(pokemon){  //mostrar pokemones display:mostrar pokemone es un parametro
    console.log(pokemon)
    const pokemonCard = document.createElement("div");//creando elemento
    pokemonCard.classList.add("pokemonCard")//agregando una clase
    let pokemonTypes = ""
    for(let i=0;i<pokemon.types.lenght;i++){

    pokemonTypes = pokemonTypes + pokemon.types[i].type.name +" "

    }
    pokemonCard.innerHTML = `
    <h2>lista de pokemon</h2>
    <h3 class="name">${pokemon.name}</h3>
    <h2 class="idNumber">${pokemon.id}</h2>
    <img src=${pokemon.sprites.front_shiny} alt="${pokemon.name}">
    <h3>Tipos de pokemon</h3>
    <p>${pokemonTypes}</p>

    `
    pokemonCard.addEventListener("click",()=>{
        console.log("click");
        showPokemonDetail(pokemon)
    })
    pokemonList.appendChild(pokemonCard);
}
    function showPokemonDetail(pokemon){
        pokemonList.style.display="none";
        pokemonDetail.style.display="block";
        let pokemonTypes= "";
        for(let i=0;i<pokemon.types.length; i++){
        //console.log(pokemon.types[i])
        pokemonTypes = pokemonTypes + pokemon.types[i].type.name +" ";        
        
        }
        pokemonInfo.innerHTML =` 
        <h2>Detalle de pokemon</h2>
        <h3 class="name">${pokemon.name}</h3>
        <h2 class="idNumber">${pokemon.id}</h2>
        <img src=${pokemon.sprites.front_shiny}
        <h4>ooke detail</h4>      
        `
}
            
backBtn.addEventListener("click",()=>{
    pokemonDetail.style.display = "none"
    pokemonList.style.display = "block"

})

async function loadPokedex() {
    const pokemon = await fetchPokemonData(60)
    console.log(pokemon)
    displayPokemon(pokemon)
}

async function searchPokemon() {
    try {
        const pokemon = await fetchPokemonData(query);
        showPokemonDetail(pokemon)
    }catch (error) {
        alert("Pokemon no encontrado,intentalo de nuevo")
    }
    
}
searchBtn.addEventListener("click",()=>searchPokemon())

async function loadPokedex() {
    for (let i=1; i<2; i++){
     const pokemon = await fetchPokemonData(i);
     displayPokemon(pokemon)   
}
}
searchInput.addEventListener("input",(e)=>{
    query = e.target.value;
})

loadPokedex()
