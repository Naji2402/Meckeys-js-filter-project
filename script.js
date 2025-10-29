let hamburger = document.querySelector('#hamburger');
let closeHam = document.querySelector('#close-button');
let sideNav = document.querySelector('#sideNav');
let productsContainer = document.querySelector('#productsContainer');
hamburger.addEventListener('click', () => {
    sideNav.classList.toggle("open")
});
closeHam.addEventListener('click', () => {
    sideNav.classList.toggle("open")
});

async function fetchProducts() {
    let res = await fetch('products.json');
    let data = await res.json();
    data.forEach((product) => {
        productsContainer.innerHTML += `<div class="products">
                <div class="product-image">
                    <img src=${product.image} alt="">
                </div>
                <div class="product-details">
                    <h3>${product.name}</h3>
                    <div></div>
                    <div>
                        <span>${product.realPrice}</span>
                        <span>${product.price}</span>
                    </div>
                </div>
            </div>`
    });
}

fetchProducts();