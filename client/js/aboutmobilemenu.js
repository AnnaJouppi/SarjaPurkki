// Toggle mobile menu
const toggle = document.querySelector('.toggle');
const navmenu = document.querySelector('.navmenu');
const aboutinfodiv = document.getElementById('aboutinfo');


function toggleMenu() { // kun menu ei ole auki
    if(navmenu.classList.contains("active")) {
        navmenu.classList.remove("active");
        toggle.querySelector("a").innerHTML = "<i class='fa fa-bars'></i>";
        aboutinfodiv.style.margin = "0 auto";
        
    } else { // kun menu on auki
        navmenu.classList.add("active");
        toggle.querySelector("a").innerHTML = "<i class='fa fa-times'></i>";
        aboutinfodiv.style.marginTop = "210px";

    }
}

toggle.addEventListener('click', toggleMenu, false);