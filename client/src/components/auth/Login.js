import React, {useState, useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';
import {Link} from 'react-router-dom';
import AuthService from '../../services/AuthService';


export default function Login(props) {
    const {setUser, setIsAuth, setIsVerified} = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState(null);

    function handleInput(event) {
        setUserInfo({...userInfo, [event.target.id]: event.target.value})
    }

    function handleLogin(event) {
        event.preventDefault();
        AuthService.login(userInfo).then(jsonData => {
            const {isAuthenticated, user} = jsonData;
            setUser(user);
            setIsAuth(isAuthenticated);

            if(jsonData.isVerified)
                setIsVerified(true)

            if(isAuthenticated){
                if (props.location.state)
                    props.history.replace(props.location.state.from.pathname)
                else
                    props.history.replace("/")
            }   
                
        })
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <br></br>
                <h3>Login...</h3>
                <div className="form-group">
                    <input id="email" type="text" onChange={handleInput} className="form-control" placeholder="Email"/>
                </div>
                <div className="form-group">
                    <input id="password" type="password" onChange={handleInput} className="form-control" placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <Link to="/forgotPassword">Forgot your password?</Link>
        </div>
    )
}
