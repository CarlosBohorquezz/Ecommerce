const BASE_URL = "https://ecommercebackend.fundamentos-29.repl.co/";


async function getProducts() {
    try {
        const data = await fetch(BASE_URL);
        const response = await data.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}

function printProducts(store) {
    let html = "";

    store.products.forEach(function ({ category, description, id, image, name, price, quantity}) {
        
        html += `
            <div class="product">
                <div class="product__img">
                    <img src="${image}" alt="" />
                </div>

                <button class="product__btn" id="${id}">+</button>
                
                <h2>$${price}.0 <span>Stock: ${quantity}</span></h2>
                <h3 class="title__product">${name}</h3>
                
            </div>

            
        `;
    });
    document.querySelector(".products").innerHTML = html;
}

function handleShowCart() {
    const icon__cart = document.querySelector(".icon__cart");
    const cart = document.querySelector(".cart");

    icon__cart.addEventListener("click", function () {
        cart.classList.toggle("cart__show");
    });
}

function addToCartFromProducts(store) {
    const productsHTML = document.querySelector(".products");

    productsHTML.addEventListener("click", function (e) {
        if(e.target.classList.contains("product__btn")) {
            const id = Number(e.target.id);

            const productFound = store.products.find(function (product) {
                return product.id === id;
            });

            if(store.cart[productFound.id]) {
                store.cart[productFound.id].amount++;
            }else {
                store.cart[productFound.id] = {
                    ...productFound,
                    amount: 1
                };
            }

            let html = "";

            for (const key in store.cart) {
                const { amount, id, image, name, price} = store.cart[key];
                html += `
                    <div class="cart_product">
                        <div class="cart__product__img">
                            <img src="${image}" alt="" />
                        </div>

                        <div class="cart__product__body">
                            <p>
                                <b>${name}</b>
                            </p>

                            <p>
                                <small>price: $${price} | amount: ${amount}</small>
                            </p>

                            <p>
                                <b>
                                    <small>$${amount * price}</small>
                                </b>
                            </p>

                            <div class="cart__product__opt">
                                <i class="bx bx-minus"></i>
                                <i class="bx bx-plus"></i>
                                <i class="bx bxs-trash"></i>
                            </div>

                        </div>
                    </div>
                `;
            }
         
            document.querySelector(".cart__products").innerHTML = html;
        }
    });
}

function modalProduct(store) {
    const titleElements = document.querySelectorAll(".title__product");
    const modalContainer = document.querySelector(".modal-container");
  
    titleElements.forEach(function (titleElement) {
      titleElement.addEventListener("click", function () {
        const productId = titleElement.getAttribute("data-product-id");
        const product = store.products.find(function (product) {
          return product.id === Number(productId);
        });
  
        if (product) {
          const modalContent = `
            <div class="modal">
              <div class="modal__content">
                <div class="product__img">
                  <img src="${product.image}" alt="" />
                </div>
                <h3>${product.name} - ${product.category}</h3>
                <p>${product.description}</p>
                <h2>$${product.price}.00</h2>
                <span>Stock: ${product.quantity}</span>
              </div>
            </div>
          `;
  
          modalContainer.innerHTML = modalContent;
          modalContainer.classList.add("show-modal");
        }
      });
    });
  }
  
  
  
async function main() {
    const store = {
        products: await getProducts(),
        cart: {}
    };
     
    printProducts(store);
    handleShowCart();
    addToCartFromProducts(store);
    modalProduct(store);

  
}

main();