import React from 'react';
import GoogleLogin from 'react-google-login';
import api from '../services/api';

function Login() {

    const onSuccess = (response) => {
        api.post('pessoa/verification', response.tokenId)
    }

    const onFailure = (response) => {
        console.log('response failure', response);
    }

    return (
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            onSuccess={onSuccess}
            onFailure={onFailure}
            buttonText = "Sign in with Google"
            isSignedIn='true' //to keep the user authenticated
            accessType='offline'
        />
    );
}

export default Login;