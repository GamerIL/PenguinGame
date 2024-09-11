// JavaScript to handle sign up and localStorage
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form from submitting normally

    const username = document.getElementById('username').value;

    if (username) {
      // Save username in local storage
      localStorage.setItem('username', username);
      document.getElementById('statusMessage').textContent = 'Username saved successfully! Redirecting...';

      // Play a sound effect
      const audio = new Audio('https://example.com/success-sound.mp3');
      audio.play();

      // Redirect to trivia.html after 2 seconds
      setTimeout(() => {
        window.location.href = 'trivia.html';
      }, 2000);
    } else {
      document.getElementById('statusMessage').textContent = 'Please enter a username.';
    }

    // Clear the input field
    document.getElementById('username').value = '';
  });