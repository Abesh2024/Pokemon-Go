const url = "https://pokeapi.co/api/v2/type/";
const list = document.getElementById("filter");
const btn = document.querySelector(".filterbutton");
const display = document.querySelector(".display");
const reset = document.querySelector(".reset");
const input = document.querySelector("#search");

async function fetchApi() {
  const data = await fetch(url);
  const { results: data3 } = await data.json();
  // console.log(data3)
  data3.forEach((e) => {
    const option = document.createElement("option");
    option.innerText = e.name;
    option.setAttribute("value", e.url);
    list.append(option);
  });
}

async function displayPok() {
  // console.log(list.value);
  const arr = [];
  const data = await fetch(list.value);
  const data2 = await data.json();
  // console.log(data2)

  const pokemonUrls = data2.pokemon.slice(0, 11).map((pok) => pok.pokemon.url);

  // console.log(pokemonUrls)
  
  for (const e of pokemonUrls) {
    const response = await fetch(e);
    const pokemonData = await response.json();
    arr.push(pokemonData);
  } 
  console.log(arr);
  showData(arr);
}


fetchApi();
btn.addEventListener("click", displayPok);

const newArr = [];
async function onloadDisplay() {
  for (let i = 1; i < 60; i++) {
    const data1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const data2 = await data1.json();
    newArr.push(data2);
  }
  showData(newArr);
}
onloadDisplay();



function showData(arr) {
  display.innerHTML = "";
  arr.forEach((data2) => {
    console.log(data2)
    const container = document.createElement("div");
    container.classList.add("aligning")
    const id = document.createElement("p");
    const image = document.createElement("img");
    const span = document.createElement("span");
    id.innerText = data2.id;
    image.setAttribute("src", data2.sprites.front_default);
    span.innerText = data2.name;
    container.append(id,image, span);
    display.append(container);
  });
}
// setTimeout(showData, 5000)

reset.addEventListener("click", () => {
  display.innerHTML = "";
  showData(newArr);
});


  input.addEventListener("input", ()=>{
      let searchRes = input.value.toLowerCase();
      let finalSearchRes = newArr.filter((pokemon) => pokemon.name.includes(searchRes) || pokemon.id.toString().includes(searchRes));
      // console.log("filteredPokemon", finalSearchRes)
      // setTimeout(showData(finalSearchRes), 6000);
      setTimeout(() => {
        showData(finalSearchRes);
      }, 400);
      // console.log("hi....");
});







// // let slowDown = null;
// input.addEventListener("input", ()=>{
//   let searchRes = input.value.toLowerCase();
//   let finalSearchRes = newArr.filter((pokemon) => pokemon.name.includes(searchRes) || pokemon.id.toString().includes(searchRes));
//   // console.log("filteredPokemon", finalSearchRes)
//   // if(slowDown != null) {
//   //   clearTimeout(slowDown)
//   // }
//   // console.log(slowDown)
//    slowDown = setTimeout(function() {
//     showData(finalSearchRes)
//     slowDown = null;
//   }, 500);
//   // console.log(slowDown)
// })

// input.addEventListener("input", ()=>{
//   let searchRes = input.value;
//   let finalSearchRes = newArr.filter((pokemon) => pokemon.id.includes(searchRes));
//   // console.log("filteredPokemon", finalSearchRes)
//   showData(finalSearchRes);
//   // console.log("abesh", newArr[0].name.includes("bul"));
// })

// setTimeout--->5s BrowserAPi



