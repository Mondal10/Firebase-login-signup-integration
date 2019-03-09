// Listen for auth status changes
auth.onAuthStateChanged((user) => {
    loginForm.reset();
    signupForm.reset();
    if (user) {
        setupUI(user);
    } else {
        setupUI();
    }
});

// Sign-Up
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const errMsgDiv = document.querySelector('#signupMsgDiv')

    //Get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // Signup the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return dataBase.collection('users').doc(cred.user.uid).set({
            firstName: signupForm['first_name'].value,
            lastName: signupForm['last_name'].value
        });
        // return cred.user.updateProfile({displayName: `${signupForm['first_name'].value} ${signupForm['last_name'].value}`});
    }).then(() => {
        var user = firebase.auth().currentUser;
        user.sendEmailVerification().then(function () {
            // Email sent.
        }).catch(function (error) {
            // An error happened.
            alert(error.message);
        });
    }).then(() => {
        // Close the login modal and reset it
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    }).catch((err) => {
        errMsgDiv.innerHTML = (err.message);
    });
});

// Logout
const logOut = document.querySelector('#logout');
logOut.addEventListener('click', (e) => {
    e.preventDefault();

    auth.signOut();
});

// Login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const errMsgDiv = document.querySelector('#loginMsgDiv')

    // Get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    // Logging in the user
    auth.signInWithEmailAndPassword(email, password).then((cred) => {

        // Close the login modal and reset it
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    }).catch((err) => {
        errMsgDiv.innerHTML = (err.message);
    });
});

// Other Account Sign up
const otherSignup = document.querySelectorAll('.otherAccountBtn');
const otherAccountSignup = (e) => {
    let btnId = e.target.id
    switch (btnId) {
        // Login and Signup using Google
        case "google-login":
        case "google-signup":
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function (result) {
                loginForm.reset();
                signupForm.reset();
                const modal = document.querySelector('#modal-login');
                M.Modal.getInstance(modal).close();
                loginForm.reset();
            }).catch(function (error) {
                alert(error.message);
            });
            break;
        // Login and Signup using Facebook
        case "facebook-login":
        case "facebook-signup":
            var provider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function (result) {
                loginForm.reset();
                signupForm.reset();
                const modal = document.querySelector('#modal-signup');
                M.Modal.getInstance(modal).close();
                loginForm.reset();
            }).catch(function (error) {
                alert(error.message);
            });
            break;
        default:
        // console.clear();
    }
}
for (var i = 0; i < otherSignup.length; i++) {
    otherSignup[i].addEventListener('click', otherAccountSignup, false);
}
