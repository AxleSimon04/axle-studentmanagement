
const loginForm = document.querySelector('#loginForm');

const studentEmail = document.querySelector('#studentEmail');

const password = document.querySelector('#password');

const errorMessage = document.querySelector('#errorMessage');


// Set the correct login creds

const correctEmail = "axle.pogi@email.com";

const correctPassword = "BSIS123";


// Check Login

loginForm.addEventListener('submit', function(event) {

    event.preventDefault();

    if (studentEmail.value === correctEmail && password.value === correctPassword) 
        {

            window.location.href = "../studman/studman.html";

        } else {

            //Display Error Message

            errorMessage.textContent = "Incorrect Email or Password! Please Try Again.";

            errorMessage.style.color = "red";

            password.value = "";

            password.focus();

        }

       });

// Show or Hide Password

const togglePassword = document.querySelector('#togglePassword');

togglePassword.addEventListener('click', function() {

    const icon = togglePassword.querySelector('i');

    if (password.type === 'password') {

        password.type = 'text';

        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');

    } else {

        password.type = 'password';

        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');

    }

});