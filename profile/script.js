// Write your script here
var login=sessionStorage.getItem("loggedIn")
console.log(login)
if(login==="true"){

}
else{


  
  window.location.href="../login.html"
}


// Get the form and input fields
const form = document.querySelector('form');
console.log(form)
const firstNameInput = document.getElementById('firstname');
const lastNameInput = document.getElementById('lastname');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmpassword');
const messageDiv = document.getElementById('message');

// Get the email of the current user
let currentUserEmail = localStorage.getItem('currentUser');
console.log(currentUserEmail)
// Retrieve the users data from local storage
const usersData = JSON.parse(localStorage.getItem('users'));
console.log(usersData)
// Get the current user's data based on their email
const currentUserData = usersData[currentUserEmail];
console.log(currentUserData)
// Use the currentUserData object to populate the form fields
document.getElementById('firstname').value = currentUserData.firstname;
document.getElementById('lastname').value = currentUserData.lastname;
document.getElementById('email').value = currentUserData.email;
document.getElementById('password').value = currentUserData.password;

// Add an event listener to the form submit button to update the user's data
document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();

  // Get the updated form data
  const updatedUserData = {
    firstname: document.getElementById('firstname').value,
    lastname: document.getElementById('lastname').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
  };
  console.log(updatedUserData.email);
  console.log(currentUserEmail);
  // Get the password and confirm password values
  const passwordValue = passwordInput.value;
  const confirmPasswordValue = confirmPasswordInput.value;
  if (passwordValue !== confirmPasswordValue) {
    event.preventDefault(); // Prevent form submission
    messageDiv.textContent = "Passwords don't match";
    return;
}

    // Check if the email has changed
    if (currentUserEmail !== updatedUserData.email) {
      // Remove the old key-value pair from the users object
      delete usersData[currentUserEmail];
      // Add a new key-value pair with the updated email
      usersData[updatedUserData.email] = updatedUserData;
      // Update the current user's email in localStorage
      localStorage.setItem('currentUser', updatedUserData.email);
      // Update the currentUserEmail variable
      currentUserEmail = updatedUserData.email;
    } else {
      // Update the user's data in the users object
      usersData[currentUserEmail] = updatedUserData;
    }
  






  // Update the user's data in local storage
  //usersData[currentUserEmail] = updatedUserData;
  localStorage.setItem('users', JSON.stringify(usersData));
  
  
  //localStorage.setItem('currentUser',updatedUserData.email)
  // Show a success message in the page
  // const successMessage = document.createElement('p');
  messageDiv.textContent = 'Profile updated successfully!';
  document.querySelector('form').insertAdjacentElement('afterend', successMessage);
});
