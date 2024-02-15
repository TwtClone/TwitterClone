const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Simple Validation (You'll likely want something more robust)
    const loginUsername = document.getElementById('username').value;
    const loginEmail = document.getElementById('email').value;
    const loginPassword = document.getElementById('password').value;

    const loginData = {
        username: loginUsername,
        email: loginEmail,
        password: loginPassword,
    };

    fetch("/api/v1/auth/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.body.stringify(loginData),
    })
    .then(Response => {
        if (Response.ok) {
            return Response.json();
        }
        throw new Error('failed to authenticate.');
    })

    .then(data => { 
        const authToken = data.token;
        console.log('Authentication successful. Token:', authToken);
    })
    
    .catch(error => {
        console.error('Error during Authentication:', error);
    })
    

    if (loginUsername === '' || loginEmail === '' || loginPassword === '') {
        alert('Please fill in all fields');
        return;
    }

    // In a real app, you'd submit the signup data to your server here
    console.log("Signup Data:", username, email, password); 
});
