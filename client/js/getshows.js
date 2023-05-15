
// Toggle mobile menu
const toggle = document.querySelector('.toggle');
const navmenu = document.querySelector('.navmenu');
const searchdiv = document.getElementById('searchdiv');
const containerdiv = document.getElementById('container');
const formdiv = document.getElementById('container');

function toggleMenu() {
    if(navmenu.classList.contains("active")) {
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

toggle.addEventListener('click', toggleMenu, false);

// Hakukentän syötteen tallentaminen funktioon

function getData() {
let newSearch = document.getElementById('searchField')
    let searchString = newSearch.value;
    return searchString;
}

async function getShows() {
    let url = 'https://api.tvmaze.com/search/shows?q='+getData();
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
        console.log('Tyhjä');
        let noresults = `<h2>Sorry, your search didn't match any shows :(</h2>`
        document.getElementById("container").innerHTML = noresults;
    }
else { 
    let div = '<div class="content">';
    shows.forEach(item => {
        div += '<div class="itembox">';
        let showname = `<h3 class="showname">${item.show.name}</h3>`;
        let otherinfo = `<p class="showotherinfo">${item.show.genres}<br><br>
                            <a href="${item.show.url}">${item.show.url}</a>
                            </p>
                            `;
        //Sarjan kuva

        // Jos kuvaa ei löydy
       if ((item.show.image) === null) {
           let noimage = '<img class="noimage" src="https://upload.wikimedia.org/wikipedia/commons/6/62/%22No_Image%22_placeholder.png">'
           div += noimage;
        //jos kuva löytyy, muutetaan sen url objektista stringiksi
       } else {
        let makeitstring = JSON.stringify(item.show.image ? item.show.image.medium : item.show.image.original)
        let imagesrc = `<img class="image" src=${makeitstring}>`; // kuva näkyviin
        div += imagesrc;
        }

        // Nimi
        div += showname; 

        // Kuvaus
        // Jos kuvausta ei löydy
        if ((item.show.summary) === null) {
            let nosummary = '<p class="showsummary"><em>No summary available.</em></p>'
            div += nosummary;
        }// jos löytyy:
        else {
            let showsummary = `<div class="showsummary">${item.show.summary}</div>`
            div += showsummary;
        }

          // Aktiivisuus
          // Jos kumpaakaan ei löydy
            if((item.show.premiered) === null && (item.show.ended) === null) {
                let noneavailabe = `<p class="showotherinfo"> No production dates available.</p>`
                div += noneavailabe;
            }
         // Jos lähetyksen alkua ei löydy
            else if ((item.show.premiered) === null) {
            let nopremiere = `<p class="showotherinfo"> Active: Not known - ${item.show.ended}</p>`
            div += nopremiere;
            }

        // Jos lähetyksen endiä ei löydy
            else if((item.show.ended) === null) {
                let noending = `<p class="showotherinfo"> Active: ${item.show.premiered} - now</p>`
                div += noending;
            }
        // jos molemmat löytyy
            else {
            let showairing = `<p class="showotherinfo"> Active: ${item.show.premiered} - ${item.show.ended}</p>`
            div += showairing;
            }

            // Genret ja URL
            div += otherinfo;
            
            div += "</div>";
            
            
    });
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
            console.log('Tyhjä');
            let noresults = `<h2>Sorry, your search didn't match any shows :(</h2>`
            document.getElementById("container").innerHTML = noresults;
        }
    else {
    let div = '<div class="content">';
    shows.forEach(item => {
        div += '<div class="itembox">';
        let showname = `<p class="showname">${item.show.name}</p>`;
        
        //Sarjan kuva

        // Jos kuvaa ei löydy
       if ((item.show.image) === null) {
        let noimage = `<a href="${item.show.url}"><img class="noimage" src="https://upload.wikimedia.org/wikipedia/commons/6/62/%22No_Image%22_placeholder.png"></a>`
           div += noimage;
        //jos kuva löytyy, muutetaan sen url objektista stringiksi
       } else {
        let makeitstring = JSON.stringify(item.show.image ? item.show.image.medium : item.show.image.original)
        let imagesrc = `<a href="${item.show.url}"><img class="image" src=${makeitstring}></a>`; // kuva näkyviin
        div += imagesrc;
        }
        
        // Nimi
        div += showname;
            
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

btn.addEventListener("click", changeToSimple)

function changeToSimple() {
    if (changesearch.getAttribute("href") == "styles.css") {
        changesearch.href = "simplesearch.css";
    } }

    let btnback = document.getElementById("sendButton");
    btnback.addEventListener("click", changeToNormal)
    
    function changeToNormal() {
        if (changesearch.getAttribute("href") == "simplesearch.css") {
            changesearch.href = "styles.css";
        } }