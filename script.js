let hamburger = document.querySelector('#hamburger');
let closeHam = document.querySelector('#close-button');
let sideNav = document.querySelector('#sideNav');

hamburger.addEventListener('click', () => {
    sideNav.classList.toggle("open")
});
closeHam.addEventListener('click', () => {
    sideNav.classList.toggle("open")
});