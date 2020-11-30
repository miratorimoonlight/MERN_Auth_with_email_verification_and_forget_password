import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import AuthService from '../../services/AuthService';


function ActivateAcc() {
    const [msg, setMsg] = useState(null);
    let {activationToken} = useParams();
    const redirectToHome = () => {
        window.location.replace("/");
    }

    useEffect(() => {
        AuthService.activateAcc(activationToken).then(jsonData => {
            if(jsonData.success){
                setMsg("Account Activated...");
                setTimeout(redirectToHome, 2000)
            }
            else {
                setMsg(jsonData.msg)
            }
        })
    }, [])

    return (
        <div className="text-center">
        {
            msg ?
            <div className="alert alert-success" role="alert"> {msg} </div> 
            : 
            <div></div>
        }
        
        </div>
    )
}

export default ActivateAcc;