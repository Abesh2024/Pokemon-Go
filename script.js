const url = "https://pokeapi.co/api/v2/type/";

let list = document.getElementById("filter");

let btn = document.querySelector(".filterbutton");

let display = document.querySelector(".display");

let reset = document.querySelector(".reset");

async function fetchApi() {
  let data = await fetch(url);
  let data2 = await data.json();
  let data3 = data2.results;
  console.log(data3);
  data3.forEach((e) => {
    let option = document.createElement("option");
    option.innerText = e.name;
    option.setAttribute("value", e.url);
    list.append(option);
    // console.log(option.value, option.innerText);
  });
}

//for pokemons url
async function displayPok() {
  let arr = [];
  let data = await fetch(list.value);

  let data2 = await data.json();

  // console.log(data2)
  // data2>pokemon=>pokemon>url
  //
  data2.pokemon.forEach(async (e, idx) => {
    // console.log("abc", e);
    if (idx < 11) {
    //  using .then
      arr.push(fetch(e.pokemon.url).then((response) => response.json()));

    //  using async await
        // const fetchData = await  fetch(e.pokemon.url);
        // const  data = await fetchData.json();
        // arr.push(data);
    }
  });
  // console.log(arr.length);
  // showData(arr)
  // data2.pokemon= array=>{pokeon=>{name , url}, slot}
//   let filteredArr = [];
  // arr.forEach(async (e) => {
  //     let a = await fetch(e.url)
  //     let b = await a.json();
  //     filteredArr.push(b)
  //     console.log(filteredArr);
  // })


  
    //  using .then
  Promise.all(arr).then((value) => {
    showData(value);
  });


 //  using async await
//   const  result = await Promise.all(arr);
//   showData(result);



  //     let div = document.createElement('div');
  //     let img  = document.createElement('img');
  //     let span = document.createElement('span');
  //     img.setAttribute('src', b.sprites.front_default)
  //     span.innerText = b.name;
  //     div.append(img, span)

          display.append(div)
  // })
}

fetchApi();

// displayPok()

btn.addEventListener("click", displayPok);

let newArr = [];
async function onloadDisplay() {
  for (let i = 1; i < 33; i++) {
    let data1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    let data2 = await data1.json();
    newArr.push(data2);
  }

  showData(newArr);
}

// window.onload = () =>
onloadDisplay();

function showData(arr) {
    
  display.innerHTML = "";
  arr.forEach((data2) => {
    // console.log(data2);
    let container = document.createElement("div");
    let image = document.createElement("img");
    let span = document.createElement("span");
    image.setAttribute("src", data2.sprites.front_default);
    span.innerText = data2.name;
    container.append(image, span);

    display.append(container);
  });
}
// console.log(arr);

reset.addEventListener("click", () => {
  display.innerHTML = "";
  showData(newArr);
});

// console.log("click", showData(newArr))