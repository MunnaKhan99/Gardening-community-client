import React, { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Component/Navbar/Navbar';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import auth from '../firebase.config';
import Swal from 'sweetalert2';


export const authContext = createContext();
export const themeContext = createContext();

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
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: " Successfully SignIn...",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                const errorMessage = error.message;
                console.log(errorMessage);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: errorMessage,
                    footer: '<a href="#">Why do I have this issue?</a>'
                });
            })
    }

    //signin:
    const handleSignIn = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Logged in",
                    showConfirmButton: false,
                    timer: 1500
                });

            })
            .catch((error) => {
                const errorMessage = error.message;
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: errorMessage,
                    footer: '<a href="#">Why do I have this issue?</a>'
                });
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

    const logOut = () => {
        signOut(auth).then(() => {
            alert("successfully logout")
        }).catch((error) => {
            alert(error.message);
        });
    }
    const contextValue = {
        handleSignUP,
        handleSignIn,
        user,
        setUser,
        loading,
        setLoading,
        logOut
    }
    const [dark, setDark] = useState(false);
    return (
        <div>
            <themeContext.Provider value={{ dark, setDark }}>
                <authContext.Provider value={contextValue}>
                    <Navbar />
                    <Outlet />
                </authContext.Provider>
            </themeContext.Provider>

        </div>
    );
};

export default RootLayout;