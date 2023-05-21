import React from 'react';
import { handleGoogleLogin } from '../../../../services/firebase/firebaseService';

export const Login = () => {
    return (
        <>
         <button onClick={handleGoogleLogin}> Entrar com google</button>
        </>
    )
}