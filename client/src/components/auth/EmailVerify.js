import React, {useState} from 'react';
import AuthService from '../../services/AuthService';


export default function EmailVerify() {
    const [msg, setMsg] = useState();

    const handleSending = () => {
        AuthService.sendNewVerificationLink().then(jsonData => {
            if(jsonData.success) {
                setMsg("New link sent....check your email")
            }
        })
    }

    return (
        <div className="text-center">
            <br></br>
            <h3>Email Verification. Check your email to activate account.</h3>
            <button className="btn btn-primary" onClick={handleSending}>Send New Verifcation Link</button>
            {
                msg ?
                <div className="alert alert-success" role="alert"> {msg} </div> :
                <div></div>
            }   
        </div>
    )
}
