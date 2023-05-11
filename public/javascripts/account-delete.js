async function deleteAccount() {
    const userId = "{{userId}}";
  
    const response = await fetch(`/users/${userId}`, {
      method: 'DELETE'
    });
  
    if (response.ok) {
        document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('#delete-account-form').addEventListener('submit', function(event) {
    event.preventDefault();
    deleteAccount();
  });
  