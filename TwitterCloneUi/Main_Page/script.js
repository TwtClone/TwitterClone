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

  
  var authToken = localStorage.getItem('authToken');
  var currentUser = localStorage.getItem('currentUser');


  //Just for putting tweet on (client-side) timeline. Refer to publishPost for putting stuff in API
  function addPost(post) {
    const postElement = createPostElement(post); //Rewrite this later to have post only show up in feed if fetch POST succeeds
    feed.appendChild(postElement);
  }

  //Publish post to API and put it in timeline
  function publishPost(post){
    fetch('/api/v1/posts', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization' : 'Bearer '+authToken
      },
      body: JSON.stringify({
        "content": post.content
      })
    })
      // .then(response => response.json())
      .then(console.log('Post published by: ',post.username))
      .then(addPost(post))
    .catch(error => {
      console.error('Error publishing post:', error);
    })
  }
  
  //Fetch every post saved in database and pass it through addPost to get it on client's timeline
  function populateFeed(){
    fetch('/api/v1/posts', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization' : 'Bearer '+authToken
    }
  })
    .then(response => response.json())
    .then(data => {
      var fetchedPosts = data
      console.log(fetchedPosts)
      fetchedPosts.forEach(element => {
        // console.log(element.content)
        addPost({username: element.postedBy, content: element.content})
      });
    })
    // .then(data => {
    //   data.forEach(element => {
    //     console.log(element);
    //   });
    // })
    .catch(error => {
      console.error('Error fetching posts:', error);
    });
  }

  tweetForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const tweetContent = tweetInput.value.trim();
    if (tweetContent !== '') {
      const newPost = { username: currentUser, content: tweetContent };
      publishPost(newPost);
      tweetInput.value = '';
    }
  });

  //Function calls for testing
  populateFeed();
  // addPost({username: currentUser, content: 'Object interaction test'});
});



//Like
//Follow

//Register (Copied from login scripts, for testing)
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

//Log In (Copied from login scripts, for testing)
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
      localStorage.setItem('authToken', authToken)
      localStorage.setItem('currentUser', username)
      console.log("Login successful. Username:", localStorage.getItem('currentUser'))
      console.log('Token: ',localStorage.getItem('authToken')); //For debug, logs fetched token. Maybe comment out later
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

function apiLogout(){
  localStorage.setItem('authToken', '');
  localStorage.setItem('currentUser', '');
  window.href='../Login_Page/index.html'
}

//For debug: Function testing
// apiReg("tony", "wahoo");
// apiLogin("Dante", "pizza");