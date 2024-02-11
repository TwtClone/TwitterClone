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
  
      const postHeaderText = document.createElement('div');
      postHeaderText.classList.add('post__headerText');
      const headerTitle = document.createElement('h3');
      headerTitle.textContent = post.username; // Set username as top text
      postHeaderText.appendChild(headerTitle);
      postHeader.appendChild(postHeaderText);
  
      const postDescription = document.createElement('div');
      postDescription.classList.add('post__headerDescription');
      const descriptionText = document.createElement('p');
      descriptionText.textContent = post.content; // Set tweet content as below text
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
  
    // Add new post
    function addPost(post) {
      const postElement = createPostElement(post);
      feed.appendChild(postElement);
    }
  
    // Fetch posts from api
    fetch('/api/v1/posts')
      .then(response => response.json())
      .then(posts => {
        posts.forEach(post => {
          addPost(post);
        });
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  
    // Event listener for tweet form submission
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
  