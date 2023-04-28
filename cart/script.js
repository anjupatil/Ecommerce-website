var login=sessionStorage.getItem("loggedIn")
console.log(login)
if(login==="true"){

}
else{


  
  window.location.href="../logout.html"
}


const currentUserEmail = localStorage.getItem('currentUser');


// Get the cart items container element
const cartItemsContainer = document.getElementById('cart-items');

// Retrieve the cart data from local storage
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// filter
const Cart = cart.filter((item) => item.userEmail === currentUserEmail);

// Initialize the total cart count and price
let cartCount = 0;
let cartPrice = 0;

// Loop through the cart items and create HTML elements for them
Cart.forEach((item) => {
  // Create a new cart item row element
  const cartItemRowElement = document.createElement('tr');
  cartItemRowElement.classList.add('cart-item-row');
  cartItemRowElement.innerHTML = `
    <td class="cart-item">
      <img src="${item.image}" height="200px" width="200px" alt="${item.name}" />
      <div class="details">
        <h4>${item.name}</h4>
        <div>Size: ${item.size}</div>
        <div>Color: ${item.color}</div>
      </div>
    </td>
    <td class="cart-price">$${item.price}</td>
    <td class="cart-quantity">${item.quantity}</td>
    <td class="cart-subtotal">$${item.price * item.quantity}</td>
    <td class="cart-delete"><button id="${item.id}" class="delete-btn">Delete</button></td>
  `;

  // Append the cart item row element to the cart items container
  cartItemsContainer.appendChild(cartItemRowElement);

  // Update the total cart count and price
  cartCount += item.quantity;
  cartPrice += item.price * item.quantity;
  
  // Add an event listener to the delete button to handle the delete action
  const deleteButton = cartItemRowElement.querySelector('.delete-btn');
  deleteButton.addEventListener('click', (e) => handleDelete(e));

});

// Update the total cart count and price on the cart page
document.getElementById('cart-total').textContent = `$${cartPrice}`;
document.getElementById('checkout-btn').addEventListener('click', handleCheckout);

function handleCheckout() {
  // Create a new Razorpay checkout instance
  const messageContainer = document.getElementById('message-container');
  messageContainer.textContent = 'Processing payment...';


  const options = {
    key: 'rzp_test_PV1oQ0oMtgXOsq',
    amount: cartPrice * 100,
    currency: 'INR',
    name: 'Shopping Cart',
    description: 'Payment for items in cart',
    image: 'logo.png',
    handler: function(response) {
      alert('Payment successful! Your transaction ID is ' + response.razorpay_payment_id);
      // Clear the cart and redirect to the home page after successful payment
      localStorage.removeItem('cart');
      window.location.href = '../shop/index.html';
    },
    prefill: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '+919876543210'
    },
    notes: {
      address: '123 Main St, Bangalore'
    },
    theme: {
      color: '#F37254'
    }
  };
  const rzp = new Razorpay(options);

  // Open the checkout popup
  rzp.open();
}


function handleDelete(event) {
  // Get the index of the cart item to be deleted


 let currentUser = localStorage.getItem('currentUser');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Filter the cart array to only include items associated with the current user
let filteredCart = cart.filter(item => item.userEmail === currentUser);
console.log(filteredCart)
// Get the index of the item to be deleted
const itemId = event.target.id;

// Find the index of the item to be deleted in the filtered cart
const index = filteredCart.findIndex(item => item.id === itemId);


if (index !== -1) {
  // Get the item from the cart
  const item = filteredCart[index];

  // If the quantity of the item is greater than 1, reduce the quantity by 1
  if (item.quantity > 1) {
    item.quantity--;
  } else {
    // Otherwise, remove the entire item from the cart
    filteredCart.splice(index, 1);
  }


// Update the cart in local storage with the filtered cart
localStorage.setItem('cart', JSON.stringify(filteredCart));

// Reload the page to reflect the updated cart
location.reload();

}
}

