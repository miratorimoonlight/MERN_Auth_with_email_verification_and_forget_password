import React, {useContext} from 'react';
import { AuthContext } from '../../context/AuthContext';
import AuthService from '../../services/AuthService';


export default function Logout() {
    const {setUser, setIsAuth, setIsVerified} = useContext(AuthContext);

    function handleLogout() {
        console.log("..logout")
        AuthService.logout().then(jsonData => {
            if(jsonData.success){
                setUser(jsonData.user);
                setIsAuth(false);
                setIsVerified(false);
            }
        })
    }

    return (
        <button className="nav-item btn btn-danger" onClick={handleLogout}> Log out </button>
    )
}
