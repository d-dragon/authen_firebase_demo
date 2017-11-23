(function () {
    var config = {
        apiKey: "AIzaSyCIKKTebZ5U45AHQP6zY_kVhTciZvQYpOM",
        authDomain: "fir-auth-007.firebaseapp.com",
        databaseURL: "https://fir-auth-007.firebaseio.com",
        projectId: "fir-auth-007",
        storageBucket: "fir-auth-007.appspot.com",
        messagingSenderId: "1077696176072"
    };
    firebase.initializeApp(config);
    console.log(firebase.name);

    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnLogOut = document.getElementById('btnLogOut');
    const txtmessage = document.getElementById('message');
    const txtTokenGreeting = document.getElementById('token-greeting');
    const txtUserToken = document.getElementById('_token');

    //Login event
    btnLogin.addEventListener('click', e => {
        //Retrieve email and password
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();

        //Sign in call
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
        /*
        auth.currentUser.getIdToken().then(function (data) {
            console.log(data);
        });
        */
    });

    btnSignUp.addEventListener('click', e => {
        //Collect email and password
        const email = txtEmail.value;
        const pass = txtPassword.value;

        if (email.length < 4) {
            alert('Please enter an email address.')
            return;
        }
        if (pass.length < 6) {
            alert('Password has at least 6 characters');
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            if (errorCode == 'auth/weak-password') {
                alear('The Password is too weak.');
            } else {
                alear(errorMessage);
            }
            console.log(error);
        })
    })
    btnLogOut.addEventListener('click', e => {
        firebase.auth().signOut();
    });


    // Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
            firebaseUser.getIdToken().then(function (data) {
                console.log("User Token >>>>>>>> " + data + "<<<<<<<<<<");
                txtUserToken.value = data;
            });
            btnLogOut.classList.remove('hide');
            txtEmail.classList.add('hide');
            txtPassword.classList.add('hide');
            btnSignUp.classList.add('hide');
            btnLogin.classList.add('hide');
            txtmessage.classList.remove('hide');
            //token
            txtTokenGreeting.classList.remove('hide');
            txtUserToken.classList.remove('hide');
        } else {
            console.log('not logged in');
            btnLogOut.classList.add('hide');
            txtEmail.classList.remove('hide');
            txtPassword.classList.remove('hide');
            btnSignUp.classList.remove('hide');
            btnLogin.classList.remove('hide');
            txtmessage.classList.add('hide');
            //token
            txtTokenGreeting.classList.add('hide');
            txtUserToken.classList.add('hide');
        }
    })
}());


