import React, {useState} from 'react';
import {isMatch} from '../../utils/Validation';
import AuthService from '../../services/AuthService';
import {useParams} from 'react-router-dom';


export default function ResetPassword(props) {
    const [msg, setMsg] = useState(null);
    const [userInput, setUserInput] = useState({password: "", confirmPassword: ""});
    const {resetToken} = useParams();

    const handleInput = (e) => {
        setUserInput({...userInput, [e.target.id]: e.target.value})
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!isMatch(userInput.password, userInput.confirmPassword))
            return setMsg("Password and Confirm Password does not match")
        else {
            setMsg(null);
            userInput.resetToken = resetToken;
            AuthService.resetPassword(userInput).then(jsonData => {
                setMsg(jsonData.msg);
                if(jsonData.success) {
                    setTimeout(() => props.history.replace("/login"), 2000)
                }
            });
        }   
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <br></br>
                <h3>Reset Your Password...</h3>
                <div className="form-group">
                    <input id="password" type="password" onChange={handleInput} className="form-control" placeholder="Password"/>
                </div>
                <div className="form-group">
                    <input id="confirmPassword" type="password" onChange={handleInput} className="form-control" placeholder="Confirm Password"/>
                </div>
                <button type="submit" className="btn btn-primary">Reset Password</button>
            </form>
            {
                msg ?
                <div className="alert alert-success">{msg}</div>:
                <div></div>
            }
        </div>
        
    )
}
