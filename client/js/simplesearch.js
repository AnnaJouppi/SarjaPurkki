
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
            let showname = `<h2 class="showname">${item.show.name}</h2>`;
            
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
                
                div += "</div>";
                

        });

        div += "</div>";
        
        let containerdiv = document.getElementById("container");
        containerdiv.innerHTML = div;
        }
    }