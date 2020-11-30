import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';


function EmailVerifyRoute({component: Component, ...rest}) {
    const {isAuth, isVerified} = useContext(AuthContext)
    console.log("...Email verify route..")

    return (
        <Route 
            {...rest}
            render = {routeProps => {
                if(isAuth) {
                    if(!isVerified) {
                        return <Component {...routeProps} />
                    }
                    else {
                        return <Redirect to="/" />
                    }
                }
                else
                    return <Redirect to={{ pathname: "/login", state: {from: routeProps.location} }} />
            }}
        />
    )
}

export default EmailVerifyRoute