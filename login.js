let loginbtn = document.getElementById("loginbtn");
loginbtn.addEventListener("click", (event) => {
  event.preventDefault();

  // Get user input
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  console.log(email);
  console.log(password);

  // Retrieve user object from local storage
  let users = {};
  try {
    const usersString = localStorage.getItem('users');
    if (usersString) {
      users = JSON.parse(usersString);
    }
  } catch (error) {
    console.error('Error retrieving users from local storage:', error);
  }

  const user = users[email];
  console.log(user);
  
  // Check if user exists and password matches
  if (user && user.password === password) {
    // Set session variable indicating user is logged in
    sessionStorage.setItem('loggedIn', true);
    localStorage.setItem('currentUser', email);
    // Redirect to homepage or desired page

    window.location.href = 'shop/index.html';
  } else {
    alert('Invalid email or password.');
  }

  // 

  
});
