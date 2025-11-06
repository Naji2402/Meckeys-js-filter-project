


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
        connectivityFiltering(data);
        priceSliderFilter(data);
        isAvailableCheck(data)
        lastOutPrinting(data)
    }catch(err) {
        console.log(err);
    }
}

fetchProducts();

// filtering code

function brandFiltering() {
      async function getBrandFiltered() {
            let response = await fetch("products.json");
            let data = await response.json();
            
            let allNewArr = data.filter((product) => {
                return newPrductsNames.includes(product.brandName)
            })
            connectivityFiltering(allNewArr);
            priceSliderFilter(allNewArr);
            isAvailableCheck(allNewArr);
            lastOutPrinting(allNewArr)
        }


let brandCheckBox = document.querySelectorAll('.brandCheck');
let newPrductsNames = [];
brandCheckBox.forEach((checkBox) => {
    checkBox.addEventListener('change', () => {
        if (checkBox.checked) {
            newPrductsNames.unshift(checkBox.value);
        }else{
            newPrductsNames = newPrductsNames.filter((name) => {
                return name != checkBox.value;
            })
        }
        getBrandFiltered()
    });
})

}

let connectCheck = document.querySelectorAll('.connectCheck');
// let checkValues = [];

function connectivityFiltering(allNewArr) {

    connectCheck.forEach((connCheck) => {
        connCheck.addEventListener('change', () => {
            if (connCheck.checked) {
                if (connCheck.value === "wired") {
                    let wired = allNewArr.filter((product) => {
                        return product.isWired === true;
                    });
                    lastOutPrinting(wired)

                }else{
                    let wired = allNewArr.filter((product) => {
                        return product.isWired === false;
                    });
                    lastOutPrinting(wired)
                }
        } 
        
        });
    });

}



brandFiltering();



// price filter

let minPrice = document.querySelector('.min-price');
let maxPrice = document.querySelector('.max-price');
let sliders = document.querySelectorAll('.slider');

function priceSliderFilter(productArr) {
    sliders.forEach((slider) => {
        slider.addEventListener('change', () => {
            let minPriceValue = minPrice.value;
            let maxPriceValue = maxPrice.value;
            let newPriceArr = productArr.filter((product) => {
                if(product.price >= minPriceValue && product.price <= maxPriceValue){
                    return product
                }
            })
            isAvailableCheck(newPriceArr)
            lastOutPrinting(newPriceArr)
            connectivityFiltering(newPriceArr);
        
    });
});    
}

function isAvailableCheck(products) {
    let newAvailableFiltered; 
    let isStockAvailable = document.querySelectorAll('.stock-button');
    isStockAvailable.forEach((stock) => {
    stock.addEventListener('click', () => {
        if (stock.checked) {
          
            let checkedValue = stock.value;
            
            if (checkedValue === 'in stock') {
                newAvailableFiltered = products.filter((product) => {
                    return product.isAvailable
                })
            }else if( checkedValue === 'out of stock') {
                newAvailableFiltered = products.filter((product) => {
                    return !product.isAvailable
                })
            }else {
                newAvailableFiltered = products.filter((product) => {
                    return product
                })
            }
            lastOutPrinting(newAvailableFiltered)    
        }
    });
});
}

function lastOutPrinting(lastProductList) {
    productsContainer.innerHTML = ''
            lastProductList.forEach((newProduct) => {
            productsContainer.innerHTML += `<div class="products">                                    <div class="product-image">
                                    <img src=${newProduct.image} alt="">
                                    <div class="fav-product-icon">
                                    <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>
                                    </div>
                                    </div>
                                    <div class="product-details">
                                    <h3>${newProduct.name}</h3>
                                    <div class="product-stars">
                                        <svg viewBox="0 -0.5 33 33" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --> <title>star</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Vivid.JS" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Vivid-Icons" transform="translate(-903.000000, -411.000000)" fill="#ffb100"> <g id="Icons" transform="translate(37.000000, 169.000000)"> <g id="star" transform="translate(858.000000, 234.000000)"> <g transform="translate(7.000000, 8.000000)" id="Shape"> <polygon points="27.865 31.83 17.615 26.209 7.462 32.009 9.553 20.362 0.99 12.335 12.532 10.758 17.394 0 22.436 10.672 34 12.047 25.574 20.22"> </polygon> </g> </g> </g> </g> </g> </g></svg>
                                        <svg viewBox="0 -0.5 33 33" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --> <title>star</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Vivid.JS" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Vivid-Icons" transform="translate(-903.000000, -411.000000)" fill="#ffb100"> <g id="Icons" transform="translate(37.000000, 169.000000)"> <g id="star" transform="translate(858.000000, 234.000000)"> <g transform="translate(7.000000, 8.000000)" id="Shape"> <polygon points="27.865 31.83 17.615 26.209 7.462 32.009 9.553 20.362 0.99 12.335 12.532 10.758 17.394 0 22.436 10.672 34 12.047 25.574 20.22"> </polygon> </g> </g> </g> </g> </g> </g></svg>
                                        <svg viewBox="0 -0.5 33 33" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --> <title>star</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Vivid.JS" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Vivid-Icons" transform="translate(-903.000000, -411.000000)" fill="#ffb100"> <g id="Icons" transform="translate(37.000000, 169.000000)"> <g id="star" transform="translate(858.000000, 234.000000)"> <g transform="translate(7.000000, 8.000000)" id="Shape"> <polygon points="27.865 31.83 17.615 26.209 7.462 32.009 9.553 20.362 0.99 12.335 12.532 10.758 17.394 0 22.436 10.672 34 12.047 25.574 20.22"> </polygon> </g> </g> </g> </g> </g> </g></svg>
                                        <svg viewBox="0 -0.5 33 33" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --> <title>star</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Vivid.JS" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Vivid-Icons" transform="translate(-903.000000, -411.000000)" fill="#ffb100"> <g id="Icons" transform="translate(37.000000, 169.000000)"> <g id="star" transform="translate(858.000000, 234.000000)"> <g transform="translate(7.000000, 8.000000)" id="Shape"> <polygon points="27.865 31.83 17.615 26.209 7.462 32.009 9.553 20.362 0.99 12.335 12.532 10.758 17.394 0 22.436 10.672 34 12.047 25.574 20.22"> </polygon> </g> </g> </g> </g> </g> </g></svg>
                                        <svg viewBox="0 -0.5 33 33" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --> <title>star</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Vivid.JS" stroke-width="0.264" fill="none" fill-rule="evenodd"> <g id="Vivid-Icons" transform="translate(-903.000000, -411.000000)" fill="#ffffff"> <g id="Icons" transform="translate(37.000000, 169.000000)"> <g id="star" transform="translate(858.000000, 234.000000)"> <g transform="translate(7.000000, 8.000000)" id="Shape"> <polygon points="27.865 31.83 17.615 26.209 7.462 32.009 9.553 20.362 0.99 12.335 12.532 10.758 17.394 0 22.436 10.672 34 12.047 25.574 20.22"> </polygon> </g> </g> </g> </g> </g> </g></svg>
                                    </div>
                                    <div>
                                    <span>₹${newProduct.realPrice.toLocaleString('en-IN')}</span>
                                    <span>₹${newProduct.price.toLocaleString('en-IN')}</span>
                                     </div>
                                     </div>
                                    </div>` 
        });
}

