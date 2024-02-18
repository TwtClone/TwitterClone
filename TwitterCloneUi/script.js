const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Simple Validation (You'll likely want something more robust)
    const username = document.getElementById('username').value;
    // const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (username === '' || password === '') {
        alert('Please fill in all fields');
        return;
    }
    else{
      apiReg(username, password);
      // console.log('register');
    }

    // In a real app, you'd submit the signup data to your server here
    // console.log("Signup Data:", username, email, password); 
});

//Register
async function apiReg(username, password){
    try{
      const req = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "username": username,
          "password": password
        })
      });
      if (req.ok){
        const reqData = await req.json;
        console.log("User created: ", reqData);
        // window.location.href='/Login_Page/index.html';
      }
      else{
        const reqError = await req.json;
        throw(reqError);
      }
    }
    catch(reqError){
      console.error('Error occurred during registration: ', reqError);
    }
  }