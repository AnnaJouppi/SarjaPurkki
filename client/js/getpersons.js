// Toggle mobile menu
const toggle = document.querySelector(".toggle");
const navmenu = document.querySelector(".navmenu");
const searchdiv = document.getElementById("searchdiv");
const containerdiv = document.getElementById("container");

function toggleMenu() {
  if (navmenu.classList.contains("active")) {
    navmenu.classList.remove("active");
    toggle.querySelector("a").innerHTML = "<i class='fa fa-bars'></i>";
    searchdiv.style.display = "flex";
    containerdiv.style.margin = "auto";
  } else {
    navmenu.classList.add("active");
    toggle.querySelector("a").innerHTML = "<i class='fa fa-times'></i>";
    searchdiv.style.display = "none";
    containerdiv.style.marginTop = "210px";
  }
}

toggle.addEventListener("click", toggleMenu, false);

function getData() {
  let newSearch = document.getElementById("searchField");
  let searchString = newSearch.value;
  return searchString;
}

async function getShows() {
  let url = "https://api.tvmaze.com/search/people?q=" + getData();
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error.message);
  }
}
// Normal search
async function renderShows() {
  let shows = await getShows();
  console.log(shows);
  if (shows.length === 0) {
    console.log("Tyhjä");
    let noresults = `<h2>Sorry, your search didn't match any Stars 😐</h2>`;
    document.getElementById("container").innerHTML = noresults;
  } else {
    let div = '<div class="content">';
    shows.forEach((item) => {
      div += '<div class="itembox">';
      let personname = `<h3 class="showname">${item.person.name}</h3>`;
      let otherinfo = `<p class="showotherinfo">
                                <a href="${item.person.url}">${item.person.url}</a>
                                </p>
                                `;

      // Jos kuvaa ei löydy
      if (item.person.image === null) {
        let noimage =
          '<img class="noimage" src="https://upload.wikimedia.org/wikipedia/commons/6/62/%22No_Image%22_placeholder.png">';
        div += noimage;
        //jos kuva löytyy, muutetaan sen url objektista stringiksi
      } else {
        let makeitstring = JSON.stringify(
          item.person.image
            ? item.person.image.medium
            : item.person.image.original
        );
        let imagesrc = `<img class="image" src=${makeitstring}>`; // kuva näkyviin
        div += imagesrc;
      }
      div += '<div class="itembox-right">';

      // Nimi
      div += personname;

      // Syntymäaika -ja/tai kuolinpäivä
      // Jos kumpaakaan ei löydy
      if (item.person.birthday === null && item.person.deathday === null) {
        let noneavailabe = `<p class="showotherinfo"> Birth and/or death date unavailable.</p>`;
        div += noneavailabe;
      }
      // Jos syntymäpäivää ei löydy
      else if (item.person.birthday === null) {
        let nobirthday = `<p class="showotherinfo"> Active: Not known - ${item.person.deathday}</p>`;
        div += nobirthday;
      }

      // Jos kuolinpäivää ei löydy
      else if (item.person.deathday === null) {
        let nodeathday = `<p class="showotherinfo">Birthday: ${item.person.birthday}</p>`;
        div += nodeathday;
      }
      // jos molemmat löytyy
      else {
        let birthanddeath = `<p class="showotherinfo"> Birthday and death: ${item.person.birthday} - ${item.person.deathday}</p>`;
        div += birthanddeath;
      }

      // Jos kotimaata ei löydy
      if (item.person.country === null) {
        let nocountry = `<p class="showotherinfo">Birth country information not available.</p>`;
        div += nocountry;
        //jos löytyy
      } else {
        let country = `<p class="showotherinfo">Born in : ${item.person.country.name}</p>`;
        div += country;
      }

      // URL

      div += otherinfo;

      // itembox-right loppuu
      div += "</div>";

      // itembox loppuu
      div += "</div>";
    });
    // content loppuu
    div += "</div>";

    let containerdiv = document.getElementById("container");
    containerdiv.innerHTML = div;
  }
}

// Simple Search

async function renderSimpleShows() {
  let shows = await getShows();
  console.log(shows);
  if (shows.length === 0) {
    console.log("Tyhjä");
    let noresults = `<h2>Sorry, your search didn't match any Stars 😐</h2>`;
    document.getElementById("container").innerHTML = noresults;
  } else {
    let div = '<div class="content">';
    shows.forEach((item) => {
      div += '<div class="itembox">';
      let personname = `<p class="showname">${item.person.name}</p>`;

      //Sarjan kuva

      // Jos kuvaa ei löydy
      if (item.person.image === null) {
        let noimage = `<a href="${item.person.url}"><img class="noimage" src="https://upload.wikimedia.org/wikipedia/commons/6/62/%22No_Image%22_placeholder.png"></a>`;
        div += noimage;
        //jos kuva löytyy, muutetaan sen url objektista stringiksi
      } else {
        let makeitstring = JSON.stringify(
          item.person.image
            ? item.person.image.medium
            : item.person.image.original
        );
        let imagesrc = `<a href="${item.person.url}"><img class="image" src=${makeitstring}></a>`; // kuva näkyviin
        div += imagesrc;
      }
      // <a href="default.asp"><img src="smiley.gif" alt="HTML tutorial" style="width:42px;height:42px;"></a>
      // Nimi
      div += personname;

      div += "</div>";
    });

    div += "</div>";

    let containerdiv = document.getElementById("container");
    containerdiv.innerHTML = div;
  }
}

// change to simple search with a button click

let btn = document.getElementById("simpleSearch");
let changesearch = document.querySelector("#stylelink");

btn.addEventListener("click", changeToSimple);

function changeToSimple() {
  if (changesearch.getAttribute("href") == "styles.css") {
    changesearch.href = "simplesearch.css";
  }
}

let btnback = document.getElementById("sendButton");
btnback.addEventListener("click", changeToNormal);

function changeToNormal() {
  if (changesearch.getAttribute("href") == "simplesearch.css") {
    changesearch.href = "styles.css";
  }
}

// Enter key activates Simple Search button
// Ei onnistunut, query lähtee palvelimelle aina tyhjänä kenttänä, vaikka muuten toimiva funktio

// let enterkey = document.getElementById("searchField");
// enterkey.addEventListener("keyup", function(yes){
//     if (yes.key === 'Enter') {
//         document.getElementById("simpleSearch").click();
//     }
// });
