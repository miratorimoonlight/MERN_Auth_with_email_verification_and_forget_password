import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import Logout from './auth/Logout';


function NavBar() {
    const {isAuth} = useContext(AuthContext)
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <NavLink className="navbar-brand" to="/">Mern Basic Auth</NavLink>

            <div className="collapse navbar-collapse" id="navbarNav">
                <div className="navbar-nav">
                    <NavLink to="/" exact className="nav-item nav-link"> Home </NavLink>
                    <NavLink to="/protect1" exact className="nav-item nav-link"> Protected_1 </NavLink>
                    <NavLink to="/protect2" exact className="nav-item nav-link"> Protected_2 </NavLink>
                    <NavLink to="/admin" exact className="nav-item nav-link"> Admin </NavLink>
                    {
                        isAuth ?
                        <Logout /> :
                        <div>
                            <NavLink to="/login">
                                <button className="nav-item btn btn-dark"> Log in </button> 
                            </NavLink>
                            <NavLink to="/register">
                                <button className="nav-item btn btn-dark"> Register </button>
                            </NavLink>
                        </div>
                    }
                </div>
            </div>
        </nav>
    )
}

export default NavBar