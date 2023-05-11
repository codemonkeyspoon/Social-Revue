document.addEventListener('DOMContentLoaded', () => {
  // Get all like and dislike buttons
  const likeButtons = document.querySelectorAll('#like-button');
  const dislikeButtons = document.querySelectorAll('#dislike-button');

  // Function to update the score UI
  const updateScoreUI = (postId, score) => {
    const scoreElement = document.getElementById(`score-${postId}`);
    if (scoreElement) {
      scoreElement.textContent = score;
    }
  };

  // Function to handle like button click
  const handleLike = (postId) => {
    fetch(`/post/${postId}/like`, { method: 'PUT' })
      .then(response => response.json())
      .then(data => {
        console.log(data.message); // Log success message
        updateScoreUI(postId, data.total_score); // Update the score UI
        location.reload(); // Refresh the page
      })
      .catch(error => {
        console.error(error);
        // Handle error if needed
      });
  };

  // Function to handle dislike button click
  const handleDislike = (postId) => {
    fetch(`/post/${postId}/dislike`, { method: 'PUT' })
      .then(response => response.json())
      .then(data => {
        console.log(data.message); // Log success message
        updateScoreUI(postId, data.total_score); // Update the score UI
        location.reload(); // Refresh the page
      })
      .catch(error => {
        console.error(error);
        // Handle error if needed
      });
  };

  // Attach event listeners to the like buttons
  likeButtons.forEach(button => {
    const postId = button.dataset.postId;
    button.addEventListener('click', () => handleLike(postId));
  });

  // Attach event listeners to the dislike buttons
  dislikeButtons.forEach(button => {
    const postId = button.dataset.postId;
    button.addEventListener('click', () => handleDislike(postId));
  });
});
