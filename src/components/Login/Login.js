import React, { useContext } from 'react';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../firebase.config';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    FacebookAuthProvider

} from "firebase/auth";

import { useState } from 'react';
import { UserContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';


const app = initializeApp(firebaseConfig);

function Login() {
    const [logInUser, setLogInUser] = useContext(UserContext);

    const googleProvider = new GoogleAuthProvider();
    const fbProvider = new FacebookAuthProvider();

    const [newUser, setNewUser] = useState(false);
    const [users, setUsers] = useState({
        isSignIn: false,
        name: '',
        email: '',
        photo: '',
        password: '',
        success: '',
        error: ''
    });



    let navigate = useNavigate();
    let location = useLocation();
    
    let from = location.state?.from?.pathname || "/";

    const handleSignIn = () => {
        const auth = getAuth();
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const { displayName, email, photoURL } = result.user;
                const signInUser = {
                    isSignIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                };
                setUsers(signInUser);
                setLogInUser(signInUser);
                navigate(from, { replace: true });
                console.log(displayName, email, photoURL)
            });
    }

    const handleFbSignIn = () => {
        const auth = getAuth();
        signInWithPopup(auth, fbProvider)
            .then((result) => {
                const user = result.user;
                setLogInUser(user)
                navigate(from, { replace: true });
                console.log('fb user after sign in:', user.name)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)

            });
    }







    const handleSignOut = () => {
        const auth = getAuth();
        signOut(auth)
            .then(result => {
                const signOutUser = {
                    isSignIn: false,
                    name: '',
                    photo: '',
                    email: ''
                }
                setUsers(signOutUser);
                console.log(result);
            })
            .catch(err => {
                console.log(err.message);
            })

    }


    const handleSubmit = (e) => {
        if (newUser && users.email && users.password) {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, users.email, users.password)
                .then((res) => {
                    const newUser = { ...users }
                    newUser.success = "user created successfully";
                    newUser.error = '';
                    setUsers(newUser);
                    updateUserName(users.name);
                    setLogInUser(newUser);
                    navigate(from, { replace: true });
                    
                })

                .catch((error) => {
                    const newUser = { ...users }
                    newUser.error = error.message;
                    newUser.success = '';
                    setUsers(newUser);
                });
        }
        if (!newUser && users.email && users.password) {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, users.email, users.password)
                .then((res) => {
                    const newUser = { ...users }
                    newUser.success = "user logged In successfully";
                    newUser.error = '';
                    setUsers(newUser);
                    setLogInUser(newUser);
                    navigate(from, { replace: true });
                    // console.log(res.user)
                })
                .catch((error) => {
                    const newUser = { ...users }
                    newUser.error = error.message;
                    newUser.success = '';
                    setUsers(newUser);
                });
        }

        e.preventDefault();
    }


    const handleChange = (event) => {
        let isFormValid = true;
        if (event.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === 'password') {
            isFormValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(event.target.value);

        }
        if (isFormValid) {
            const newUser = { ...users }
            newUser[event.target.name] = event.target.value;
            setUsers(newUser);
            console.log(newUser);
        }

    };


    const updateUserName = name => {
        const auth = getAuth();
        updateProfile(auth.currentUser, {
            displayName: name
        }).then(() => {
            console.log('user name updated successfully');
        }).catch((error) => {
            console.log(error.message);
        });
    }





    return (
        <div style={{ textAlign: 'center' }}>
            {
                users.isSignIn ?
                    <button onClick={handleSignOut}>Sign Out</button> :
                    <button onClick={handleSignIn}>Sign in</button>
            }
            <br />
            <button onClick={handleFbSignIn}>Facebook login</button>

            {
                users.isSignIn &&
                <div>
                    <h2>Name: {users.name}</h2>
                    <h3>Email: {users.email}</h3>
                    <img src={users.photo} alt="" />
                </div>
            }

            <h1>Our Own Authentication</h1>

            <input type="checkbox" name="newUser" id="newUser" onChange={() => setNewUser(!newUser)} />
            <label htmlFor="newUser">New User Sign Up</label>

            <form action="" onSubmit={handleSubmit}>
                {newUser && <input onBlur={handleChange} type="text" name="name" id="" placeholder='Your name' required />} <br />
                <input onBlur={handleChange} type="text" name="email" placeholder="enter your email" id="" required /> <br />
                <input onBlur={handleChange} type="password" name="password" placeholder="enter your password" id="" required /> <br />
                <input type="submit" value="register" />
            </form>


            <p>email: {users.email}</p>
            <p>password: {users.email}</p>


            <p style={{ color: 'red' }}>{users.error}</p>
            <p style={{ color: 'green' }}>{users.success}</p>
        </div>
    );
}

export default Login;
