//Register (copied from register page)
// async function apiReg(username, password){
//     try{
//       const req = await fetch("/api/v1/auth/register", {
//         method: "POST",
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           "username": username,
//           "password": password
//         })
//       });
//       if (req.ok){
//         const reqData = await req.json;
//         console.log("User created: ", reqData);
//       }
//       else{
//         const reqError = await req.json;
//         throw(reqError);
//       }
//     }
//     catch(reqError){
//       console.error('Error occurred during registration: ', reqError);
//     }
//   }

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', function(event) {
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
      apiLogin(username, password);
      // window.location.href='../Main_Page/index.html';
      // console.log('next pressed.');
    }

    // In a real app, you'd submit the signup data to your server here
    // console.log("Signup Data:", username, email, password); 
});

//Log In
async function apiLogin(username, password){
  try{
    const req = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "username": username,
        "password": password
      })
    });
    // .then()
    // // .then(res => res.json())
    // .then(data => console.log("Data: ", data))
    // .then(console.log("aaaaa"))
    //   .catch(error => console.log("An error has occurred: ", error))
    
    if(req.ok){
      const authToken = await req.text();
      localStorage.setItem('authToken', authToken);
      console.log("Login successful. Username:", username)
      // var appendtest = 'Bearer '+authToken
      // console.log('Append test', appendtest); 
      console.log('Token: ',authToken); //For debug, logs fetched token. Maybe comment out later
      window.location.href='../Main_Page/index.html';
    }
    else{
      const reqError = await req.text();
      console.log('Login error: ',reqError);
      console.error(reqError);
    }
  }
  catch(reqError){
    console.error('Error occurred during login: ', reqError);
  }
}