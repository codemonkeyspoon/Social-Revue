// Get the buttons
const likeButton = document.getElementById('like-button');
const dislikeButton = document.getElementById('dislike-button');

// Function to handle like button click
const handleLike = () => {
  const postId = likeButton.dataset.postId; // Get the post ID from the data attribute
  fetch(`/post/${postId}/like`, { method: 'PUT' })
    .then(response => response.json())
    .then(data => {
      console.log(data.message); // Log success message
      // Handle UI update if needed
    })
    .catch(error => {
      console.error(error);
      // Handle error if needed
    });
};

// Function to handle dislike button click
const handleDislike = () => {
  const postId = dislikeButton.dataset.postId; // Get the post ID from the data attribute
  fetch(`/post/${postId}/dislike`, { method: 'PUT' })
    .then(response => response.json())
    .then(data => {
      console.log(data.message); // Log success message
      // Handle UI update if needed
    })
    .catch(error => {
      console.error(error);
      // Handle error if needed
    });
};

// Attach event listeners to the buttons
likeButton.addEventListener('click', handleLike);
dislikeButton.addEventListener('click', handleDislike);