


// filter button open and close section

let allFilterBtn = document.querySelector('#allFilterBtn');
let allFilter = document.querySelector('.product-filter-section');
let backButton = document.querySelector('.go-back');

let brandBtn = document.querySelector('#brandBtn');
let brandFilter = document.querySelector('.filter-section-button');
let backButtonTwo = document.querySelector('.back-two');



allFilterBtn.addEventListener('click', () => {
    allFilter.classList.toggle("product-filter-open")
});

backButton.addEventListener('click', () => {
    allFilter.classList.toggle("product-filter-open")
});

brandBtn.addEventListener('click', () => {
    brandFilter.classList.toggle("all-filter-open")
});

backButtonTwo.addEventListener('click', () => {
    brandFilter.classList.toggle("all-filter-open")
});





// sidebar open section

let hamburger = document.querySelector('#hamburger');
let closeHam = document.querySelector('#close-button');
let sideNav = document.querySelector('#sideNav');
hamburger.addEventListener('click', () => {
    sideNav.classList.toggle("open")
});
closeHam.addEventListener('click', () => {
    sideNav.classList.toggle("open")
});




// filter slider section



let input = document.querySelectorAll('.slider');

let minValue = document.querySelector('#min-value');

let maxValue = document.querySelector('#max-value');

let rangeFill = document.querySelector('.range-fill');

input.forEach((inp) => {
    inp.addEventListener('input', () => {
        let minPrice = parseInt(input[0].value);
        let maxPrice = parseInt(input[1].value);
        
        
        minValue.innerHTML = `$ ${minPrice}`
        maxValue.innerHTML = `$ ${maxPrice}`
    });
});



// product fetching section

let productsContainer = document.querySelector('#productsContainer');

async function fetchProducts() {
    try{
        let res = await fetch('products.json');
        let data = await res.json();
        data.forEach((product) => {
            productsContainer.innerHTML += `<div class="products">
            <div class="product-image">
            <img src=${product.image} alt="">
            <div class="fav-product-icon">
            <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>
            </div>
            </div>
            <div class="product-details">
            <h3>${product.name}</h3>
            <div></div>
            <div>
            <span>₹${product.realPrice}</span>
            <span>₹${product.price}</span>
            </div>
            </div>
            </div>`
        });
    }catch(err) {
        console.log(err);
    }
}

fetchProducts();





// filtering code


let brandCheckBox = document.querySelectorAll('.brandCheck');
let allNewArr = [];

brandCheckBox.forEach((checkBox) => {
    checkBox.addEventListener('change', () => {
        if (checkBox.checked) {
            async function getBrandFiltered() {
                let response = await fetch("products.json");
                let data = await response.json();
                data.forEach((product) => {
                    if (checkBox.value === product.brandName) {
                        allNewArr.unshift(product)
                        productsContainer.innerHTML = '';
                        allNewArr.forEach((newProduct) => {
                            productsContainer.innerHTML += `<div class="products">
                                    <div class="product-image">
                                    <img src=${newProduct.image} alt="">
                                    <div class="fav-product-icon">
                                    <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>
                                    </div>
                                    </div>
                                    <div class="product-details">
                                    <h3>${newProduct.name}</h3>
                                    <div></div>
                                    <div>
                                    <span>₹${newProduct.realPrice}</span>
                                    <span>₹${newProduct.price}</span>
                                    </div>
                                    </div>
                                    </div>`
                        });
                    }
                });
            }
            getBrandFiltered()
    }
    });
    
});