import React, {useState} from 'react';
import AuthService from '../../services/AuthService';


export default function ForgotPassword() {
    const [msg, setMsg] = useState(null);
    const [email, setEmail] = useState(null);

    const handleInput = (e) => {
        setEmail(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setMsg(null)
        AuthService.forgotPassword(email).then(jsonData => {
            setMsg(jsonData.msg)
        })
    }

    return (
        <div>
            <br></br>
            <h3>Forgot your password?</h3>
            <br></br>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Enter your email address..." className="form-control" onChange={handleInput}/>
                <br></br>
                <button type="submit" className="btn btn-primary">Verify your email</button>
            </form>
            {
                msg ?
                <div className="alert alert-success">{msg}</div>:
                <div></div>
            }
        </div>
    )
}
