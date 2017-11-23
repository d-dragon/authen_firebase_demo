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

    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnLogOut = document.getElementById('btnLogOut');
    const txtmessage = document.getElementById('message');
    //Login event
    btnLogin.addEventListener('click', e => {
        //Retrieve email and password
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();

        //Sign in call
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });

    btnLogOut.addEventListener('click', e => {
        firebase.auth().signOut();
    });


    // Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
            btnLogOut.classList.remove('hide');
            txtEmail.classList.add('hide');
            txtPassword.classList.add('hide');
            txtmessage.classList.remove('hide');
        } else {
            console.log('not logged in');
            btnLogOut.classList.add('hide');
            txtEmail.classList.remove('hide');
            txtPassword.classList.remove('hide');
            txtmessage.classList.add('hide');
        }
    })
}());


