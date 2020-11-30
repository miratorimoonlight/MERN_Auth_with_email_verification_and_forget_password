import React, {useState, useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';
import AuthService from '../../services/AuthService';


export default function Register(props) {
    const {setUser, setIsAuth} = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState(null);

    function handleInput(event) {
        setUserInfo({...userInfo, [event.target.id]: event.target.value})
    }

    function handleRegister(event) {
        event.preventDefault();
        AuthService.register(userInfo).then(jsonData => {
            if(!jsonData.error) {
                setUser(jsonData.user);
                setIsAuth(jsonData.isAuthenticated);
                props.history.replace("/protect1")
            }   
        })
    }

    return (
        <form onSubmit={handleRegister}>
            <br></br>
            <h3>Register...</h3>
            <div className="form-group">
                <input id="email" type="text" onChange={handleInput} className="form-control" placeholder="Email"/>
            </div>
            <div className="form-group">
                <input id="password" type="password" onChange={handleInput} className="form-control" placeholder="Password"/>
            </div>
            <div className="form-group">
                <input id="role" type="text" onChange={handleInput} className="form-control" placeholder="Role..."/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}
