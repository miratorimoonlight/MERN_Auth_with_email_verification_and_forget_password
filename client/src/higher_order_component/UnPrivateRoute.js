//Includes Login, Register....These routes must not show after login successfully
import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';


function UnPrivateRoute({component: Component, ...rest}) {
    const {isAuth} = useContext(AuthContext);

    return (
        <Route 
            {...rest}
            render = {routeProps => {
                if(isAuth)
                    return <Redirect to="/"/>
                return <Component {...routeProps} />
            }} 
        />
    )
}

export default UnPrivateRoute