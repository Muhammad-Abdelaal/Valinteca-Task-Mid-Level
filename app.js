const BODY = document.querySelector("body");
const BOOKS_LIST = document.querySelector(".books");
const OVERLAY = document.querySelector("#overlay");
const MODAL = document.querySelector("#modal");
const CART = document.querySelector(".cart-menu");
const CART_BUTTON = document.querySelector(".cart");
const CART_COUNTER = document.querySelector(".cart-counter");

const VIEW_ICON = "./icons/icons8-eye-96.png";

const booksArr = [
  {
    product_name: "City of Lies",
    product_image: "./books images/City of Lies.jpg",
    product_price: "25",
    added_to_cart: false,
  },
  {
    product_name: "The Little Mermaid",
    product_image:
      "./books images/13 Mermaid Books You Should Bring To The Beach.jpg",
    product_price: "22",
    added_to_cart: false,
  },
  {
    product_name: "Journey to the center of the earth",
    product_image: "./books images/Journey to the center of the earth.jpg",
    product_price: "32",
    added_to_cart: false,
  },
  {
    product_name: "Oliver Twist",
    product_image: "./books images/Oliver Twistt.jpg",
    product_price: "19",
    added_to_cart: false,
  },
  {
    product_name: "Great Expectations by Charles Dickens",
    product_image: "./books images/Great Expectations by Charles Dickens.jpg",
    product_price: "12",
    added_to_cart: false,
  },
  {
    product_name: "The Race ",
    product_image: "./books images/The Race.jpg",
    product_price: "25",
    added_to_cart: false,
  },
];

if (!JSON.parse(localStorage.getItem("products"))) {
  localStorage.setItem("products", JSON.stringify(booksArr));
}


const render = (function () {
  const books = function () {
    JSON.parse(localStorage.getItem("products")).forEach((item) => {
      BOOKS_LIST.innerHTML += `
      <div class="book">
        <div class = "book-image__container">
         <img src = "${item.product_image}" />
        </div>
        <div class = "book-details-action">
            <div class = "book-details">
                <p class = "book-name">${item.product_name}</p>
                <p class = "book-price">Price: $${item.product_price}</p>
            </div>
            <div class = "book-actions">
                <img class = "view" src = "${VIEW_ICON}" />
                <div class = "add-to-cart">+</div>
            </div>
        </div>
      </div>
      `;
    });
  };

  const cart = function () {
    CART.style.display = 'block'
    BODY.style.overflowY = "hidden";
    let cartElements = JSON.parse(localStorage.getItem("products")).filter(
      (book) => book.added_to_cart === true
    );
    CART.innerHTML = ''  
    if (cartElements.length > 0) {
      CART.style.maxHeight = '500px'
      cartElements.forEach((cartItem) => {
        CART.innerHTML += `
        <div class = "cart-item">
          <div class = "cart-item__container">
            <div class = "cart-item__image-container">
              <img class = "cart-item__image" src = "${cartItem.product_image}" />
            </div>
            <div class = "cart-item__details">
              <p class = "cart-item__name">${cartItem.product_name}</p>
              <p class = "cart-item__price">Price: $${cartItem.product_price}</p>
            </div>
          </div>
          <p class = "remove" >Remove</p>
        </div>
        `;
      });
      const REMOVE = document.querySelectorAll('.remove');
      for (let i = 0; i < REMOVE.length; i++) {
        REMOVE[i].addEventListener("click", (e) => {
          const name = e.target.previousElementSibling.children[1].children[0].textContent
          const itemToRemoveIndex = JSON.parse(localStorage.getItem("products")).findIndex(item => item.product_name === name )
          const products = JSON.parse(localStorage.getItem("products"))
          let updatedProduct = {...products[itemToRemoveIndex], added_to_cart:false}
          let updatedProducts = JSON.parse(localStorage.getItem("products"))
          updatedProducts[itemToRemoveIndex] = updatedProduct;
          localStorage.setItem(
            "products",
            JSON.stringify(updatedProducts)
          );
          render.cart();
          render.cartCounter();
    
        });
      }
    } else {
      CART.style.height = 'max-content'
      CART.innerHTML =
        '<div style="color:#5a58585d; font-size: 22px; font-weight: bold; width: max-content; margin:auto;">Cart is empty</div>';
    }
  };

  const cartCounter = function () {
    let cartElements = JSON.parse(localStorage.getItem("products")).filter(item => item.added_to_cart === true);
    
    if (cartElements.length > 0 && cartElements !== null) {
      CART_COUNTER.style.display = "grid";
      CART_COUNTER.innerHTML = `${cartElements.length}`;
    } else {
      CART_COUNTER.style.display = "none";
    }
    
  };

  const quickView = function (currentBook) {
    BODY.style.overflowY = "hidden";
    if (window.innerWidth < 768 ) {
      MODAL.style.display = 'block';
    }
    else if (window.innerWidth >= 768 ) {
      MODAL.style.display = 'flex';
    }
    window.addEventListener('resize', ()=>{
      if (window.innerWidth < 768 && MODAL.style.display !== 'none') {
        MODAL.style.display = 'block';
      }
      else if (window.innerWidth >= 768 && MODAL.style.display !== 'none') {
        MODAL.style.display = 'flex';
      }
    })
    MODAL.innerHTML = `
        <div class = "modal-item-image-container">
          <img src = "${currentBook.product_image}" class = "modal-item-image" />
        </div>
        <div class = "modal-item-details">
          <p class = "modal-item__name">${currentBook.product_name}</p>
          <p class = "modal-item__price">Price: $${currentBook.product_price}</p>
        </div>
      
    `
  }
  return { books, cart, cartCounter, quickView};
})();

render.books();
render.cartCounter();


const ADD_TO_CART = document.querySelectorAll(".add-to-cart");
for (let i = 0; i < ADD_TO_CART.length; i++) {
  ADD_TO_CART[i].addEventListener("click", () => {
    const product = JSON.parse(localStorage.getItem("products"))[i];
    const itemIndex = JSON.parse(localStorage.getItem("products")).findIndex( item => item.product_name === product.product_name );

    if (product.added_to_cart === false) {
      let updatedProduct = {...product, added_to_cart:true}
      let updatedProducts = JSON.parse(localStorage.getItem("products"))
      updatedProducts[itemIndex] = updatedProduct;
      localStorage.setItem(
        "products",
        JSON.stringify(updatedProducts)
      );
      render.cartCounter();
    }
  });
}

const QUICK_VIEW_BTN = document.querySelectorAll(".view")
for (let i = 0; i < ADD_TO_CART.length; i++) {
  QUICK_VIEW_BTN[i].addEventListener("click", () => {
    const product = JSON.parse(localStorage.getItem("products"))[i];
    render.quickView(product)
    OVERLAY.style.display = 'block';
  });
}


CART_BUTTON.addEventListener('click',()=>{
  OVERLAY.style.display = 'block'
  render.cart();
})
OVERLAY.addEventListener('click',()=>{
  BODY.style.overflowY = "scroll";
  OVERLAY.style.display = 'none';
  MODAL.style.display = 'none';
  CART.style.display = 'none';
})