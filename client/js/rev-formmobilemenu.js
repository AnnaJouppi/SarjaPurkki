// Toggle mobile menu
const toggle = document.querySelector('.toggle');
const navmenu = document.querySelector('.navmenu');
const formcontdiv = document.getElementById('formcontainer');


function toggleMenu() { // kun menu ei ole auki
    if(navmenu.classList.contains("active")) {
        navmenu.classList.remove("active");
        toggle.querySelector("a").innerHTML = "<i class='fa fa-bars'></i>";
        formcontdiv.style.marginTop = "100px";
        
    } else { // kun menu on auki
        navmenu.classList.add("active");
        toggle.querySelector("a").innerHTML = "<i class='fa fa-times'></i>";
        formcontdiv.style.marginTop = "210px";

    }
}

toggle.addEventListener('click', toggleMenu, false);
