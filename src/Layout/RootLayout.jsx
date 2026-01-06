import React, { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Component/Navbar/Navbar';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import auth from '../firebase.config';


export const authContext = createContext();

const RootLayout = () => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //signup:
    const handleSignUP = (email, password, name, photoUrl) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                alert("Successfully signup")


                return updateProfile(userCredential.user, {
                    displayName: name,
                    photoURL: photoUrl
                })
            })
            .then(() => {
                console.log("Profile updated successfully");
                alert("Signup successful");
            })
            .catch(error => {
                const errorMessage = error.message;
                console.log(errorMessage);
            })
    }

    //signin:
    const handleSignIn = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('logged in user: ', user);

            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log('Error', errorMessage);
            });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser);
            setUser(currentUser);
            setLoading(false)
        })

        return () => {
            unsubscribe()
        }
    }, [])


    const contextValue = {
        handleSignUP,
        handleSignIn,
        user,
        setUser,
        loading

    }
    return (
        <div>
            <authContext.Provider value={contextValue}>
                <Navbar />
                <Outlet />
            </authContext.Provider>

        </div>
    );
};

export default RootLayout;