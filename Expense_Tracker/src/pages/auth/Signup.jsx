import React, { useEffect } from 'react';
import { auth, provider } from '../../config/firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';



const Signup = () => {
  const navigate = useNavigate();

 ;

  const signinHandler = async () => {
    const res = await signInWithPopup(auth, provider);
    const authInfo = {
      userID: res.user.uid,
      name: res.user.displayName,
      profilePhoto: res.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem('auth', JSON.stringify(authInfo));
    navigate('/tracker');
    
  };

  

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <p className="text-3xl font-semibold text-white mb-8">Sign In With Google to Continue</p>
      <button
        className="flex items-center justify-center px-6 py-3 bg-cyan-600 rounded-md text-white text-lg font-semibold shadow-md hover:bg-cyan-700 transition duration-300"
        onClick={signinHandler}
      >
        <FcGoogle className="mr-2" />
        Sign in with Google
      </button>
    </div>
  );
};

export default Signup;
