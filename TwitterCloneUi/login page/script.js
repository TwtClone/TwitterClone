//Register
async function apiReg(username, password){
    try{
      const req = await fetch("http://localhost:3000/api/v1/auth/register", {
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
  
  //Log In (NOTE: Move to login page)
  async function apiLogin(username, password){
    try{
      const req = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          
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