const produtc = {
  id: 1,
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  price: 109.95,
  description:
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: { rate: 3.9, count: 120 },
};

var login=sessionStorage.getItem("loggedIn")
console.log(login)
if(login==="true"){

}
else{


  
  window.location.href="../login.html"
}

// Get reference to the product container element
let productContainer = document.getElementById('product-container');


// 
// Function to generate random colors
function getRandomColors() {
  const colors = ["red", "blue", "black", "green", "yellow", "white"];
  const randomColors = [];
  const numOfColors = Math.floor(Math.random() * 3) + 1; // Generate a random number between 1 and 3

  for (let i = 0; i < numOfColors; i++) {
    const randomIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomIndex];
    randomColors.push(randomColor);
  }

  return randomColors;
}

// Function to generate random sizes
function getRandomSizes() {
  const sizes = ["s", "l", "m", "xl", "xxl"];
  const randomSizes = [];
  const numOfSizes = Math.floor(Math.random() * 3) + 1; // Generate a random number between 1 and 3

  for (let i = 0; i < numOfSizes; i++) {
    const randomIndex = Math.floor(Math.random() * sizes.length);
    const randomSize = sizes[randomIndex];
    randomSizes.push(randomSize);
  }

  return randomSizes;
}


function generateId() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';
  for (let i = 0; i < 8; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}



// Function to display message when no products are found
function displayNotFoundMessage() {
  const productsDiv = document.getElementById('product-container');
  productsDiv.innerHTML = '<p>No products found</p>';
}







// 








// Fetch products from the API
fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(products => {

     // Add random colors and sizes to each product object
     products.forEach((product) => {
      product["Colors"] = getRandomColors();
      product["Sizes"] = getRandomSizes();
      product["id"]=generateId();
    });

    // Do something with the updated products array
    console.log(products);
    // Save products to local storage
    localStorage.setItem('products', JSON.stringify(products));
    
    // Display products on the page
    products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('item');
      
      productElement.innerHTML = `

      <img src="${product.image}" alt="${product.title}" />
      <h4>${product.title}</h4>
      <div class="info">
        <div class="row">
          <div class="price">Price:$${product.price}</div>
          <div class="sized">Size:${product.Sizes}</div>
        </div>
        <div class="colors">
          Colors:
          <div class="row">
            <div class="circle" style="background-color:${product.Colors[0]} "></div>
            <div class="circle" style="background-color:${product.Colors[1]}"></div>
            <div class="circle" style="background-color:${product.Colors[2]}"></div>
          </div>
        </div>
        <div class="row">Rating:${product.rating.rate}</div>
        
      </div>
      <button  img="${product.image}" name="${product.title}" prodid="${product.id}" price="${product.price}" size="${product.Sizes}" colors="${product.Colors}" rate="${product.rating.rate}"  class="add-to-cart" id="addBtn">Add to Cart</button>
       
      `;
      const addToCartBtn = productElement.querySelector('.add-to-cart');
      addToCartBtn.addEventListener('click', () => {
        // Get product ID from "prodid" attribute
        const productImage=addToCartBtn.getAttribute("img");
        const productId = addToCartBtn.getAttribute('prodid');
        const productName=addToCartBtn.getAttribute('name');
        const productPrice=addToCartBtn.getAttribute('price');
        const productSize=addToCartBtn.getAttribute('size');
        const productColor=addToCartBtn.getAttribute('colors');
        const productRate=addToCartBtn.getAttribute('rate');
        

        // Add product to cart in local storage
        addToCart(productImage,productId,productName,productPrice,productSize,productColor,productRate);
      });
      productContainer.appendChild(productElement);
    });
  })
  .catch(error => console.error(error));
  
  




 // addToCart(productImage,productId,productName,productPrice,productSize,productColor,productRate);
  // cart
  function addToCart(productImage,productId,productName,productPrice,productSize,productColor,productRate) {
    const userEmail = localStorage.getItem('currentUser');

    // Get the existing cart data from local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Check if the product is already in the cart
    let productInCart = cart.find(item => item.id === productId);
  
    if (productInCart) {
      // If the product is already in the cart, increase the quantity
      productInCart.quantity += 1;
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      cart.push({
        userEmail: userEmail,
        image: productImage,
        id: productId,
        name: productName,
        price: productPrice,
        size: productSize,
        color: productColor,
        rate: productRate,
        quantity: 1
      });
    }
  
    // Save the updated cart data back to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
  
    // Display a confirmation message to the user
    alert('Product added to cart!');
  }
  



  // search

  let search=document.getElementById("search-input");
  search.addEventListener("input",(e)=>{
    console.log("search")
    console.log(search.value.trim())
    
    
    const products = JSON.parse(localStorage.getItem('products'));
    console.log(products);
    let searchQ=search.value.trim().toLowerCase();
    // filter
      const filteredProducts=products.filter(product=>
        product.title.toLowerCase().includes(searchQ)||
        product.description.toLowerCase().includes(searchQ) ||
        product.category.toLowerCase().includes(searchQ)
        );
        console.log(filteredProducts);

        if (filteredProducts.length === 0) {
          displayNotFoundMessage();
        } else {
          displayProducts(filteredProducts);
          attachAddToCartListeners();
        }

        

    // fetch('https://fakestoreapi.com/products')
    // .then(response=>response.json())
    // .then(products=>{
    //   let searchQ=search.value.trim().toLowerCase();
    //   //filter
    //   const filteredProducts=products.filter(product=>
    //     product.title.toLowerCase().includes(searchQ)||
    //     product.description.toLowerCase().includes(searchQ) ||
    //     product.category.toLowerCase().includes(searchQ)
    //     );
    //     console.log(filteredProducts)
    //     displayProducts(filteredProducts);
    // })
    // .catch(error=>console.error(error))


    
    
  })


  function displayProducts(filteredproducts){
    productContainer.innerHTML='';
    filteredproducts.forEach(product=>{
      const productElement=document.createElement('div');
      console.log(product.Colors)
    console.log(product.Sizes)
      productElement.classList.add('item');
      productElement.innerHTML = `

    <img src="${product.image}" alt="${product.title}" />
    <h4>${product.title}</h4>
    <div class="info">
      <div class="row">
        <div class="price">Price:$${product.price}</div>
        <div class="sized">Size:${product.Sizes}</div>
      </div>
      <div class="colors">
        Colors:
        <div class="row">
          <div class="circle" style="background-color:${product.Colors[0]} "></div>
          <div class="circle" style="background-color:${product.Colors[1]}"></div>
          <div class="circle" style="background-color:${product.Colors[2]}"></div>
        </div>
      </div>
     
      <div class="row">Rating:${product.rating.rate}</div>
    </div>
    <button  img="${product.image}" name="${product.title}" prodid="${product.id}" price="${product.price}" size="${product.Sizes}" colors="${product.Colors}" rate="${product.rating.rate}"  class="add-to-cart" id="addBtn">Add to Cart</button>
    `;
    
    const addToCartBtn = productElement.querySelector('.add-to-cart');
      addToCartBtn.addEventListener('click', () => {
        // Get product ID from "prodid" attribute
        const productImage=addToCartBtn.getAttribute("img");
        const productId = addToCartBtn.getAttribute('prodid');
        const productName=addToCartBtn.getAttribute('name');
        const productPrice=addToCartBtn.getAttribute('price');
        const productSize=addToCartBtn.getAttribute('size');
        const productColor=addToCartBtn.getAttribute('colors');
        const productRate=addToCartBtn.getAttribute('rate');
        

        // Add product to cart in local storage
        addToCart(productImage,productId,productName,productPrice,productSize,productColor,productRate);
      });

    
    productContainer.appendChild(productElement);

    })
  }




 let all=document.getElementById("all");
 all.addEventListener("click",(e)=>{
  location.reload();
 })

 let mens=document.getElementById("mens");
 mens.addEventListener("click",(e)=>{

  const products = JSON.parse(localStorage.getItem('products'));
    console.log(products);
    let searchQ="mens";
    // filter
      const filteredProducts=products.filter(product=>
        product.title.toLowerCase().includes(searchQ)||
        product.description.toLowerCase().includes(searchQ) ||
        product.category.toLowerCase().includes(searchQ)
        );
        console.log(filteredProducts)
        if (filteredProducts.length === 0) {
          displayNotFoundMessage();
        } else {
          displayProducts(filteredProducts);
          attachAddToCartListeners();
        }



 })


 let women=document.getElementById("womens");
 women.addEventListener("click",(e)=>{
  const products = JSON.parse(localStorage.getItem('products'));
  console.log(products);
  let searchQ="women";
  // filter
    const filteredProducts=products.filter(product=>
      product.title.toLowerCase().includes(searchQ)||
      product.description.toLowerCase().includes(searchQ) ||
      product.category.toLowerCase().includes(searchQ)
      );
      console.log(filteredProducts)
      if (filteredProducts.length === 0) {
        displayNotFoundMessage();
      } else {
        displayProducts(filteredProducts);
        attachAddToCartListeners();
      }


 })


 let jewellery=document.getElementById("jewellery");
 jewellery.addEventListener("click",(e)=>{

  const products = JSON.parse(localStorage.getItem('products'));
  console.log(products);
  let searchQ="jewel";
  // filter
    const filteredProducts=products.filter(product=>
      product.title.toLowerCase().includes(searchQ)||
      product.description.toLowerCase().includes(searchQ) ||
      product.category.toLowerCase().includes(searchQ)
      );
      console.log(filteredProducts)
      if (filteredProducts.length === 0) {
        displayNotFoundMessage();
      } else {
        displayProducts(filteredProducts);
        attachAddToCartListeners();
      }

 })


 let electronics=document.getElementById("electronics")
 electronics.addEventListener("click",(e)=>{
  const products = JSON.parse(localStorage.getItem('products'));
  console.log(products);
  let searchQ="electronics";
  // filter
    const filteredProducts=products.filter(product=>
      product.title.toLowerCase().includes(searchQ)||
      product.description.toLowerCase().includes(searchQ) ||
      product.category.toLowerCase().includes(searchQ)
      );
      console.log(filteredProducts)
      if (filteredProducts.length === 0) {
        displayNotFoundMessage();
      } else {
        displayProducts(filteredProducts);
        attachAddToCartListeners();
      }

 })


//  colors filter
let red = document.getElementById("red")

red.addEventListener("change", (e) => {
  if (e.target.checked) {
    const products = JSON.parse(localStorage.getItem('products'));
    console.log(products);
    let searchQ = "red";
    // filter
    const filteredProducts = products.filter(product => {
      const colors = Array.isArray(product.Colors) ? product.Colors : [product.Colors];
      return (
        
        colors.some(color => color.toLowerCase().includes(searchQ))
      );
    });
    console.log(filteredProducts)
    if (filteredProducts.length === 0) {
      displayNotFoundMessage();
    } else {
      displayProducts(filteredProducts);
      attachAddToCartListeners();
    }
  } else {
    location.reload();
  }
});



let blue = document.getElementById("blue")

blue.addEventListener("change", (e) => {
  if (e.target.checked) {
    const products = JSON.parse(localStorage.getItem('products'));
    console.log(products);
    let searchQ = "blue";
    // filter
    const filteredProducts = products.filter(product => {
      const colors = Array.isArray(product.Colors) ? product.Colors : [product.Colors];
      return (
        
        colors.some(color => color.toLowerCase().includes(searchQ))
      );
    });
    console.log(filteredProducts)
    if (filteredProducts.length === 0) {
      displayNotFoundMessage();
    } else {
      displayProducts(filteredProducts);
      attachAddToCartListeners();
    }
  } else {
    location.reload();
  }
});


let green = document.getElementById("green")

green.addEventListener("change", (e) => {
  if (e.target.checked) {
    const products = JSON.parse(localStorage.getItem('products'));
    console.log(products);
    let searchQ = "green";
    // filter
    const filteredProducts = products.filter(product => {
      const colors = Array.isArray(product.Colors) ? product.Colors : [product.Colors];
      return (
        
        colors.some(color => color.toLowerCase().includes(searchQ))
      );
    });
    console.log(filteredProducts)
    if (filteredProducts.length === 0) {
      displayNotFoundMessage();
    } else {
      displayProducts(filteredProducts);
      attachAddToCartListeners();
    }
  } else {
    location.reload();
  }
});


let black = document.getElementById("black")

black.addEventListener("change", (e) => {
  if (e.target.checked) {
    const products = JSON.parse(localStorage.getItem('products'));
    console.log(products);
    let searchQ = "black";
    // filter
    const filteredProducts = products.filter(product => {
      const colors = Array.isArray(product.Colors) ? product.Colors : [product.Colors];
      return (
        
        colors.some(color => color.toLowerCase().includes(searchQ))
      );
    });
    console.log(filteredProducts)
    if (filteredProducts.length === 0) {
      displayNotFoundMessage();
    } else {
      displayProducts(filteredProducts);
      attachAddToCartListeners();
    }
  } else {
    location.reload();
  }
});


let white = document.getElementById("white")

white.addEventListener("change", (e) => {
  if (e.target.checked) {
    const products = JSON.parse(localStorage.getItem('products'));
    console.log(products);
    let searchQ = "white";
    // filter
    const filteredProducts = products.filter(product => {
      const colors = Array.isArray(product.Colors) ? product.Colors : [product.Colors];
      return (
        
        colors.some(color => color.toLowerCase().includes(searchQ))
      );
    });
    console.log(filteredProducts)
    if (filteredProducts.length === 0) {
      displayNotFoundMessage();
    } else {
      displayProducts(filteredProducts);
      attachAddToCartListeners();
    }
  } else {
    location.reload();
  }
});


// size filter

let small = document.getElementById("s")

small.addEventListener("change", (e) => {
  if (e.target.checked) {
    const products = JSON.parse(localStorage.getItem('products'));
    console.log(products);
    let searchQ = "s";
    // filter
    const filteredProducts = products.filter(product => {
      const sizes = Array.isArray(product.Sizes) ? product.Sizes : [product.Sizes];
      return (
        
        sizes.some(size => size.toLowerCase().includes(searchQ))
      );
    });
    console.log(filteredProducts)
    if (filteredProducts.length === 0) {
      displayNotFoundMessage();
    } else {
      displayProducts(filteredProducts);
      attachAddToCartListeners();
    }
  } else {
    location.reload();
  }
});



let medium = document.getElementById("m")

medium.addEventListener("change", (e) => {
  if (e.target.checked) {
    const products = JSON.parse(localStorage.getItem('products'));
    console.log(products);
    let searchQ = "m";
    // filter
    const filteredProducts = products.filter(product => {
      const sizes = Array.isArray(product.Sizes) ? product.Sizes : [product.Sizes];
      return (
        
        sizes.some(size => size.toLowerCase().includes(searchQ))
      );
    });
    console.log(filteredProducts)
    if (filteredProducts.length === 0) {
      displayNotFoundMessage();
    } else {
      displayProducts(filteredProducts);
      attachAddToCartListeners();
    }
  } else {
    location.reload();
  }
});


let large = document.getElementById("l")

large.addEventListener("change", (e) => {
  if (e.target.checked) {
    const products = JSON.parse(localStorage.getItem('products'));
    console.log(products);
    let searchQ = "l";
    // filter
    const filteredProducts = products.filter(product => {
      const sizes = Array.isArray(product.Sizes) ? product.Sizes : [product.Sizes];
      return (
        
        sizes.some(size => size.toLowerCase().includes(searchQ))
      );
    });
    console.log(filteredProducts)
    if (filteredProducts.length === 0) {
      displayNotFoundMessage();
    } else {
      displayProducts(filteredProducts);
      attachAddToCartListeners();
    }
  } else {
    location.reload();
  }
});


let xlarge = document.getElementById("xl")

xlarge.addEventListener("change", (e) => {
  if (e.target.checked) {
    const products = JSON.parse(localStorage.getItem('products'));
    console.log(products);
    let searchQ = "xl";
    // filter
    const filteredProducts = products.filter(product => {
      const sizes = Array.isArray(product.Sizes) ? product.Sizes : [product.Sizes];
      return (
        
        sizes.some(size => size.toLowerCase().includes(searchQ))
      );
    });
    console.log(filteredProducts)
    if (filteredProducts.length === 0) {
      displayNotFoundMessage();
    } else {
      displayProducts(filteredProducts);
      attachAddToCartListeners();
    }
  } else {
    location.reload();
  }
});

// rating filter

const rangeInput = document.getElementById("range");

rangeInput.addEventListener("input", (e) => {
  console.log(e.target.value)
  const rating = e.target.value;
  const products = JSON.parse(localStorage.getItem('products'));

  // filter products based on selected rating
  const filteredProducts = products.filter(product => product.rating.rate >= rating);
  console.log(filteredProducts)
  // display filtered products
  if (filteredProducts.length === 0) {
    displayNotFoundMessage();
  } else {
    displayProducts(filteredProducts);
    attachAddToCartListeners();
  }
});



//price range filter
let priceRangeInputs=document.querySelectorAll('input[name="prange"]')
priceRangeInputs.forEach(input=>{
  input.addEventListener('change',()=>{
    const products=JSON.parse(localStorage.getItem('products'))
    const checkedInputs=Array.from(priceRangeInputs).filter(input=>input.checked)

    let filteredProducts=[];

    if(checkedInputs.length){
      const prices=checkedInputs.map(input=>input.id.split('-'));
      console.log(prices)
      filteredProducts=products.filter(product=>{
        const productPrice=parseFloat(product.price);
        for(const [minPrice,maxPrice] of prices)
        {
          if(productPrice>=parseFloat(minPrice) &&
          productPrice<=parseFloat(maxPrice))
          {

            return true;
          }

        }
        return false;
      })

    }
    else{
      filteredProducts=products;
    }
    if (filteredProducts.length === 0) {
      displayNotFoundMessage();
    } else {
      displayProducts(filteredProducts);
      attachAddToCartListeners();
    }
  })
})



function attachAddToCartListeners(){
  var addToCartBtns = document.querySelectorAll(".add-to-cart");
  
  // Loop through all the buttons and attach an event listener to each one
  addToCartBtns.forEach(function(addToCartBtn) {
    addToCartBtn.addEventListener("click", function(event) {
      // Get the product ID from the "prodid" attribute of the clicked button
      var productId = event.target.getAttribute("prodid");
  
      // Retrieve the cart from local storage
      var cart = JSON.parse(localStorage.getItem("cart")) || {};
  
      // Add the product to the cart
      if (cart[productId]) {
        cart[productId]++;
      } else {
        cart[productId] = 1;
      }
  
      // Store the updated cart in local storage
      localStorage.setItem("cart", JSON.stringify(cart));
  
      // Display a success message to the user
      alert("Item added to cart!");
    });
  });

}


//  ADD TO CART

// Get all the "add to cart" buttons





