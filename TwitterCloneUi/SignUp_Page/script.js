const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Simple Validation (You'll likely want something more robust)
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (username === '' || email === '' || password === '') {
        alert('Please fill in all fields');
        return;
    }

    // In a real app, you'd submit the signup data to your server here
    console.log("Signup Data:", username, email, password); 
});
