import React, { createContext, useState } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Component/Navbar/Navbar';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '../../firebase.config';

export const authContext = createContext();

const RootLayout = () => {

    const [user, setUser] = useState();

    //signup:
    const handleSignUP = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                alert("Successfully signup")
            })
            .catch(error => {
                const errorMessage = error.message;
                console.log(errorMessage);
            })
    }
    const contextValue = {
        handleSignUP
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