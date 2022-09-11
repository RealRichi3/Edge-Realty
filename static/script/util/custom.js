// API url
let url = "http://127.0.0.1:5520/api";


// REGISTER \\
let submit_button = document.getElementById('register-button'),
    reg_name = document.getElementById('name-register'),
    reg_email = document.getElementById('email-register'),
    reg_password = document.getElementById('password-register'),
    conf_password = document.getElementById('confirm-password-register');

// User input checks --> input format, matching password
function inputFormatCheck(user_email, user_password, user_conf_password) {
    let email_pass = false,
        password_pass = false,
        email_regex, password_regex;

    // Regular Expression for password and email format
    email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    password_regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (user_email.match(email_regex)) { email_pass = true }
    if (user_password.match(password_regex)) { password_pass = true }
    password_pass = user_password === user_conf_password

    return password_pass * email_pass
}

// Register user
submit_button.addEventListener('click', () => {
    if (inputFormatCheck(reg_email.value, reg_password.value, conf_password.value)) {
        let reg_data = {
            "name": reg_name.value,
            "email": reg_email.value,
            "password": reg_password.value,
            "user_type": "regular"
        };
        axios.post(url + '/user/register', reg_data)
            .then((response) => {
                console.log(response)
                window.alert('Successful ')

                setTimeout(() => {
                    location.href = 'login-register.html'
                }, 1000)()
            }, (error) => {
                window.alert('Invalid Credentials')
                console.log(error)
            })
            .catch(error => {
                console.log(error)
            });
    } else {
        window.alert("An error occured")
    };

})


// LOGIN \\
let login_button = document.getElementById('login-button'),
    login_email = document.getElementById('email-login'),
    login_password = document.getElementById('password-login');

login_button.addEventListener('click', () => {
    let login_data = {
        "email": login_email.value,
        "password": login_password.value
    }
    axios.post(url + '/user/login', login_data)
        .then(response => {
            window.alert('Successful ')
            setTimeout(() => {
                location.href = 'property-grid.html'
            }, 1000)()
        }, (error) => {
            window.alert('Invalid Login Credentials')
            console.log(error)
        })

})

nnew