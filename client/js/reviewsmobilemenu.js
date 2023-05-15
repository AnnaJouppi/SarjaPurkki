// Toggle mobile menu
const toggle = document.querySelector('.toggle');
const navmenu = document.querySelector('.navmenu');
const descdiv = document.getElementById('description');


function toggleMenu() { // kun menu ei ole auki
    if(navmenu.classList.contains("active")) {
        navmenu.classList.remove("active");
        toggle.querySelector("a").innerHTML = "<i class='fa fa-bars'></i>";
        descdiv.style.margin = "0 auto";
        
        
    } else { // kun menu on auki
        navmenu.classList.add("active");
        toggle.querySelector("a").innerHTML = "<i class='fa fa-times'></i>";
        descdiv.style.marginTop = "210px";
        
        

        

    }
}

toggle.addEventListener('click', toggleMenu, false);
