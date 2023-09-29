import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = (props:any) => {
    const navigate = useNavigate()
    const token = sessionStorage.getItem('token');
    console.log(token, ' token' )
    useEffect(() => {
        if (!token || token === undefined) {
            navigate('/login')
            console.log('not authenticate')
        }
    },[token])

    return (
        <div>
            {props.children}
        </div>
    );
}

export default Auth;