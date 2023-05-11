document.addEventListener('DOMContentLoaded', () => {
  // Get all post and comment like buttons
  const postLikeButtons = document.querySelectorAll('.post-like-button');
  const postDislikeButtons = document.querySelectorAll('.post-dislike-button');
  const commentLikeButtons = document.querySelectorAll('.comment-like-button');
  const commentDislikeButtons = document.querySelectorAll('.comment-dislike-button');

  // Function to update the score UI
  const updateScoreUI = (elementId, score) => {
    const scoreElement = document.getElementById(elementId);
    if (scoreElement) {
      scoreElement.textContent = score;
    }
  };

  // Function to handle post like button click
  const handlePostLike = (postId) => {
    fetch(`/post/${postId}/like`, { method: 'PUT' })
      .then(response => response.json())
      .then(data => {
        console.log(data.message); // Log success message
        updateScoreUI(`score-${postId}`, data.total_score); // Update the score UI
        location.reload(); // Refresh the page
      })
      .catch(error => {
        console.error(error);
        // Handle error if needed
      });
  };

  // Function to handle post dislike button click
  const handlePostDislike = (postId) => {
    fetch(`/post/${postId}/dislike`, { method: 'PUT' })
      .then(response => response.json())
      .then(data => {
        console.log(data.message); // Log success message
        updateScoreUI(`score-${postId}`, data.total_score); // Update the score UI
        location.reload(); // Refresh the page
      })
      .catch(error => {
        console.error(error);
        // Handle error if needed
      });
  };

  // Function to handle comment like button click
  const handleCommentLike = (commentId) => {
    fetch(`/api/comments/${commentId}/like`, { method: 'PUT' })
      .then(response => response.json())
      .then(data => {
        console.log(data.message); // Log success message
        updateScoreUI(`comment-score-${commentId}`, data.total_score); // Update the score UI
        location.reload(); // Refresh the page
      })
      .catch(error => {
        console.error(error);
        // Handle error if needed
      });
  };

  // Function to handle comment dislike button click
  const handleCommentDislike = (commentId) => {
    fetch(`/api/comments/${commentId}/dislike`, { method: 'PUT' })
      .then(response => response.json())
      .then(data => {
        console.log(data.message); // Log success message
        updateScoreUI(`comment-score-${commentId}`, data.total_score); // Update the score UI
        location.reload(); // Refresh the page
      })
      .catch(error => {
        console.error(error);
        // Handle error if needed
      });
  };

  // Attach event listeners to the post like buttons
  postLikeButtons.forEach(button => {
    const postId = button.dataset.postId;
    button.addEventListener('click', () => handlePostLike(postId));
  });

  // Attach event listeners to the post dislike buttons
  postDislikeButtons.forEach(button => {
    const postId = button.dataset.postId;
    button.addEventListener('click', () => handlePostDislike(postId));
  });

  // Attach event listeners to the comment like buttons
  commentLikeButtons.forEach(button => {
    const commentId = button.dataset.commentId;
    button.addEventListener('click', () => handleCommentLike(commentId));
  });

  // Attach event listeners to the comment dislike
  commentDislikeButtons.forEach(button => {
    const commentId = button.dataset.commentId;
    button.addEventListener('click', () => handleCommentDislike(commentId));
  }
  );
});