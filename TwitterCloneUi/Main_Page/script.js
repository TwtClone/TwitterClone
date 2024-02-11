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
        'Content-type': 'application/json'
      },
      body: ({
        'usernane': '',
        'content': post
      })
    })
      .then(response => response.json())
    .catch(error => {
      console.error('Error publishing post:', error);
    })

  }
  
  function populateFeed(){
    fetch('http://localhost:3000/api/v1/posts', {
    method: 'GET',
    headers: {
      'Content-type': 'application.json'
    }
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .then(posts => {
      posts.forEach(post => {
        addPost(post);
      });
    })
    .catch(error => {
      console.error('Error fetching posts:', error);
    });
  }
  
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