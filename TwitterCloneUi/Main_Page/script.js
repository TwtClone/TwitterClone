document.addEventListener('DOMContentLoaded', function () {
  const tweetForm = document.getElementById('tweetForm');
  const tweetInput = document.getElementById('tweetInput');
  const feed = document.getElementById('feed');

  function createPostElement(post) {
    const postElement = document.createElement('div');
    postElement.classList.add('post');

    const postBody = document.createElement('div');
    postBody.classList.add('post__body');

    const postHeader = document.createElement('div');
    postHeader.classList.add('post__header');

    const profilePicture = document.createElement('img');
    profilePicture.src = 'images/102 Kawaii and Cute Anime Girl Names (with Meanings)_Feature.jpg';
    profilePicture.alt = 'Profile Picture';
    profilePicture.classList.add('post__profilePicture');
    profilePicture.style.width = '50px'; 
    profilePicture.style.height = '50px';
    postHeader.appendChild(profilePicture);

    const postHeaderText = document.createElement('div');
    postHeaderText.classList.add('post__headerText');

    const username = document.createElement('h3');
    username.textContent = post.username;
    postHeaderText.appendChild(username);
    postHeader.appendChild(postHeaderText);

    const postDescription = document.createElement('div');
    postDescription.classList.add('post__headerDescription');
    const descriptionText = document.createElement('p');
    descriptionText.textContent = post.content;
    postDescription.appendChild(descriptionText);
    postHeader.appendChild(postDescription);

    postBody.appendChild(postHeader);

    const postFooter = document.createElement('div');
    postFooter.classList.add('post__footer');

    const repeatIcon = document.createElement('span');
    repeatIcon.classList.add('material-icons');
    repeatIcon.textContent = 'repeat';
    const favoriteIcon = document.createElement('span');
    favoriteIcon.classList.add('material-icons');
    favoriteIcon.textContent = 'favorite_border';
    const publishIcon = document.createElement('span');
    publishIcon.classList.add('material-icons');
    publishIcon.textContent = 'publish';
    postFooter.appendChild(repeatIcon);
    postFooter.appendChild(favoriteIcon);
    postFooter.appendChild(publishIcon);

    postBody.appendChild(postFooter);

    postElement.appendChild(postBody);

    return postElement;
  }
  
  

  function addPost(post) {
    const postElement = createPostElement(post);
    feed.appendChild(postElement);

    fetch('http://localhost:3000/api/v1/posts', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlcnJ5IiwiaWF0IjoxNzA3NzMwNjg4LCJleHAiOjE3MDc4MTcwODh9.bXcyjcEYVi7Vz2tpoFwIM1lZxEp44kXE8kLW_IyT-yY'
      },
      body: JSON.stringify({
        'username': '',
        'content': post
      })
    })
      .then(response => response.json())
    .catch(error => {
      console.error('Error publishing post:', error);
    })

  }

  var sessionToken = '';

  async function apiLogin(){
    try{
      //Login part
      const lreq = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "username": "terry",
          "password": "wahoo"
        })
      });
      // .then()
      // // .then(res => res.json())
      // .then(data => console.log("Data: ", data))
      // .then(console.log("aaaaa"))
      //   .catch(error => console.log("An error has occurred: ", error))
      
      if(lreq.ok){
        const authToken = await lreq.text();
        localStorage.setItem('authToken', authToken);
        sessionToken = localStorage.getItem(authToken);
        console.log("Login successful")
        var appendtest = 'Bearer '+authToken
        console.log('Append test', appendtest); 
        console.log('Token: ',authToken);
      }
      else{
        console.log('Login error');
        const lreqError = await lreq.text();
        console.error(errorData);
      }
    }
    catch(lreqError){
      console.error('Error occurred during login: ', lreqError);
    }
  }
  
  function populateFeed(){
    fetch('http://localhost:3000/api/v1/posts', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlcnJ5IiwiaWF0IjoxNzA3NzMwNjg4LCJleHAiOjE3MDc4MTcwODh9.bXcyjcEYVi7Vz2tpoFwIM1lZxEp44kXE8kLW_IyT-yY'
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
    .then(posts => {
      posts.forEach(post => {
        addPost(post);
      });
    })
    .catch(error => {
      console.error('Error fetching posts:', error);
    });
  }
  
  apiLogin();
  populateFeed();

  tweetForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const tweetContent = tweetInput.value.trim();
    if (tweetContent !== '') {
      const newPost = { username: '', content: tweetContent };
      addPost(newPost);
      tweetInput.value = '';
    }
  });
});

const regDetails = {
    "username": "terry",
    "password": "wahoo"
  }

//Register with static details for testing, adapt later for user inputted data
// async function apiReg(){
//   //Hardcoded username & password
  

//   try{
//     const req = await fetch("http://localhost:3000/api/v1/auth/register", {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(regDetails)
//     });
//     if (req.ok){
//       const reqData = await req.json;
//       console.log("User created: ", reqData);


      

//     }
//     else{
//       const reqError = await req.json;
//       throw(reqError);
//     }
//   }
//   catch(reqError){
//     console.error('Error occurred during registration: ', reqError);
//   }
// }

// async function apiLogin(){
//   try{
//     //Login part
//     const lreq = await fetch("http://localhost:3000/api/v1/auth/login", {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(regDetails)
//     });
//     // .then()
//     // // .then(res => res.json())
//     // .then(data => console.log("Data: ", data))
//     // .then(console.log("aaaaa"))
//     //   .catch(error => console.log("An error has occurred: ", error))
    
//     if(lreq.ok){
//       const authToken = await lreq.text();
//       localStorage.setItem('authToken', authToken);
//       console.log("Login successful")
//       console.log(authToken); 
//     }
//     else{
//       console.log('Login error');
//       const lreqError = await lreq.text();
//       console.error(errorData);
//     }
//   }
//   catch(lreqError){
//     console.error('Error occurred during login: ', lreqError);
//   }
// }

// apiReg();
// apiLogin();

// console.log(authToken);